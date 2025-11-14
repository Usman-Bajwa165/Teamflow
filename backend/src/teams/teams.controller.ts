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
  user?: { userId: string; email?: string; role?: string };
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
    const uid = req.user?.userId;
    if (!uid) throw new UnauthorizedException('Missing authenticated user');
    return this.teams.createTeam(uid, dto.name);
  }

  @Get('my')
  async myTeams(@Req() req: JwtRequest) {
    const uid = req.user?.userId;
    if (!uid) throw new UnauthorizedException('Missing authenticated user');
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
}
