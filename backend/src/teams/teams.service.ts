import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TeamsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async createTeam(ownerId: string, name: string) {
    return this.prisma.team.create({
      data: {
        name,
        members: {
          create: {
            userId: ownerId,
            role: 'owner',
          },
        },
      },
      include: { members: true },
    });
  }

  async getTeamsForUser(userId: string) {
    const memberships = await this.prisma.teamMember.findMany({
      where: { userId },
      include: { team: true },
    });
    return memberships.map((m) => ({
      team: m.team,
      role: m.role,
      membershipId: m.id,
    }));
  }

  async getTeamMembers(teamId: string) {
    const members = await this.prisma.teamMember.findMany({
      where: { teamId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
    return members;
  }

  async inviteMemberByEmail(teamId: string, email: string, role = 'member') {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User with that email not found');

    // prevent duplicate membership
    const existing = await this.prisma.teamMember.findFirst({
      where: { teamId, userId: user.id },
    });
    if (existing) throw new BadRequestException('User already a member');

    return this.prisma.teamMember.create({
      data: { teamId, userId: user.id, role },
    });
  }

  async changeMemberRole(teamId: string, memberId: string, newRole: string) {
    const member = await this.prisma.teamMember.findUnique({
      where: { id: memberId },
    });
    if (!member || member.teamId !== teamId)
      throw new NotFoundException('Member not found in team');

    return this.prisma.teamMember.update({
      where: { id: memberId },
      data: { role: newRole },
    });
  }

  async removeMember(teamId: string, memberId: string) {
    const member = await this.prisma.teamMember.findUnique({
      where: { id: memberId },
    });
    if (!member || member.teamId !== teamId)
      throw new NotFoundException('Member not found in team');

    return this.prisma.teamMember.delete({ where: { id: memberId } });
  }

  async findTeamById(teamId: string) {
    return this.prisma.team.findUnique({ where: { id: teamId } });
  }
}
