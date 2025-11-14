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
      include: { user: true },
    });
    const out = await Promise.all(
      members.map(async (m) => {
        const otherCount = await this.prisma.teamMember.count({
          where: { userId: m.userId, NOT: { teamId } },
        });
        return { ...m, user: m.user, inOtherTeams: otherCount > 0 };
      }),
    );
    return out;
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
  async listAllTeams() {
    return this.prisma.team.findMany({
      include: {
        members: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // add method to teams.service.ts
  async listAllTeamsWithProjectCount() {
    const teams = await this.prisma.team.findMany({
      include: {
        members: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
        _count: { select: { /* prisma has _count */ projects: true } }, // if you have relation count; else compute separately
      },
    });

    // If you don't have _count or relation name differs, get projects count per team:
    const out = [];
    for (const t of teams) {
      const count = await this.prisma.project.count({
        where: { teamId: t.id },
      });
      out.push({ ...t, projectCount: count });
    }
    return out;
  }
  async getUserRole(userId: string): Promise<string | null> {
    const u = await this.prisma.user.findUnique({
      where: { id: String(userId) },
      select: { role: true },
    });
    return u?.role ?? null;
  }
  // teams.service.ts
  async getTeamDetails(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: String(teamId) },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
        projects: true, // or include minimal fields
      },
    });
    if (!team) throw new NotFoundException('Team not found');
    // normalize members for frontend
    const members = (team.members || []).map((m) => ({
      id: m.id,
      role: m.role,
      user: m.user,
    }));
    return {
      id: team.id,
      name: team.name,
      ownerId: (team as any).ownerId ?? null,
      members,
      projects: team.projects ?? [],
    };
  }
  async deleteTeam(teamId: string) {
    // gather project ids for this team
    const projects = await this.prisma.project.findMany({
      where: { teamId: String(teamId) },
      select: { id: true },
    });
    const projectIds = projects.map((p) => p.id);

    // gather column ids for those projects
    const columns = await this.prisma.boardColumn.findMany({
      where: {
        projectId: { in: projectIds.length ? projectIds : ['__none__'] },
      },
      select: { id: true },
    });
    const columnIds = columns.map((c) => c.id);

    // transactionally:
    const tx = [];

    // 1) Nullify assignees on tasks for these columns (safe)
    if (columnIds.length) {
      tx.push(
        this.prisma.task.updateMany({
          where: { columnId: { in: columnIds } },
          data: { assigneeId: null },
        }),
      );

      // 2) delete tasks in those columns
      tx.push(
        this.prisma.task.deleteMany({ where: { columnId: { in: columnIds } } }),
      );

      // 3) delete columns
      tx.push(
        this.prisma.boardColumn.deleteMany({
          where: { id: { in: columnIds } },
        }),
      );
    }

    // 4) delete projects
    if (projectIds.length) {
      tx.push(
        this.prisma.project.deleteMany({ where: { id: { in: projectIds } } }),
      );
    }

    // 5) delete team members
    tx.push(
      this.prisma.teamMember.deleteMany({ where: { teamId: String(teamId) } }),
    );

    // 6) delete the team itself
    tx.push(this.prisma.team.delete({ where: { id: String(teamId) } }));

    // run transaction
    await this.prisma.$transaction(tx);

    return { ok: true };
  }
}
