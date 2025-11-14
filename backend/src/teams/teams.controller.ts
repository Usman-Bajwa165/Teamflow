// backend/src/teams/teams.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { TeamRoles } from './team-roles.decorator';
import { TeamRolesGuard } from './team-roles.guard';
import { Request } from 'express';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

interface JwtRequest extends Request {
  // widened shape: token middleware may provide userId OR id OR sub
  user?: {
    userId?: string;
    id?: string;
    sub?: string;
    email?: string;
    role?: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private teams: TeamsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Req() req: JwtRequest, @Body() dto: CreateTeamDto) {
    if (!dto || !dto.name)
      throw new BadRequestException('Team name is required');
    const uid = String(req.user?.userId ?? req.user?.id ?? req.user?.sub ?? '');
    if (!uid) throw new UnauthorizedException('Missing authenticated user');
    return this.teams.createTeam(uid, dto.name);
  }

  @Get('my')
  async myTeams(@Req() req: JwtRequest) {
    const uidRaw = req.user?.userId ?? req.user?.id ?? req.user?.sub;
    const uid = uidRaw ? String(uidRaw) : '';
    if (!uid) throw new UnauthorizedException('Missing authenticated user');

    // if token already contains role 'admin', return all
    if (req.user?.role === 'admin') {
      return this.teams.listAllTeams();
    }

    // else check DB role (resiliency)
    const role = await this.teams.getUserRole(uid);
    if (role === 'admin') {
      return this.teams.listAllTeams();
    }

    // normal user => their teams
    return this.teams.getTeamsForUser(uid);
  }

  @Get(':id/members')
  @UseGuards(TeamRolesGuard)
  @TeamRoles('owner', 'admin', 'member') // members can view
  async members(@Param('id') id: string) {
    return this.teams.getTeamMembers(id);
  }

  @Post(':id/invite')
  @UseGuards(TeamRolesGuard)
  @TeamRoles('owner', 'admin') // only owner/admin can invite
  async invite(@Param('id') id: string, @Body() dto: InviteMemberDto) {
    return this.teams.inviteMemberByEmail(id, dto.email, dto.role || 'member');
  }

  @Patch(':id/members/:memberId/role')
  @UseGuards(TeamRolesGuard)
  @TeamRoles('owner', 'admin') // only higher roles can change roles
  async changeRole(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @Body() dto: UpdateMemberRoleDto,
  ) {
    return this.teams.changeMemberRole(id, memberId, dto.role);
  }

  @Delete(':id/members/:memberId')
  @UseGuards(TeamRolesGuard)
  @TeamRoles('owner', 'admin') // owner/admin remove members
  async removeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ) {
    return this.teams.removeMember(id, memberId);
  }

  // GET /teams (admin-only)
  @Get()
  async listAll(@Req() req: JwtRequest) {
    const uid = String(req.user?.userId ?? req.user?.id ?? req.user?.sub ?? '');
    const role = req.user?.role ?? (await this.teams.getUserRole(uid));
    if (!uid) throw new BadRequestException('Missing auth user');
    if (role !== 'admin')
      throw new ForbiddenException('Only global admin can list all teams');
    return this.teams.listAllTeamsWithProjectCount();
  }
  @Get(':id')
  async getTeam(@Param('id') id: string) {
    return this.teams.getTeamDetails(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTeamEndpoint(@Req() req: JwtRequest, @Param('id') id: string) {
    if (!id) throw new BadRequestException('Team id required');
    const uid = String(req.user?.userId ?? req.user?.id ?? req.user?.sub ?? '');
    if (!uid) throw new BadRequestException('Missing authenticated user');

    // allow if global admin
    const globalRole = req.user?.role ?? (await this.teams.getUserRole(uid));
    if (globalRole === 'admin') {
      return this.teams.deleteTeam(id);
    }

    // else check if user is owner of the team
    const members = await this.teams.getTeamMembers(id);
    const member = members.find((m) => m.user?.id === uid);
    if (!member) throw new ForbiddenException('Not a member of the team');
    if (member.role !== 'owner')
      throw new ForbiddenException('Only team owner may delete the team');

    return this.teams.deleteTeam(id);
  }
}
