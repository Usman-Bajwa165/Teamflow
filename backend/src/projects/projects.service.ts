// backend/src/projects/projects.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // Only global admin will call this to create projects (enforced in controller)
  async createProject(
    userId: string,
    name: string,
    description?: string,
    teamId?: string,
    dueDate?: string,
  ) {
    if (!teamId) throw new BadRequestException('teamId is required');

    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');

    return this.prisma.project.create({
      data: {
        name,
        description: description || null,
        teamId,
        assignedAt: new Date(),
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        team: true,
        columns: {
          orderBy: { position: 'asc' },
          include: { tasks: { orderBy: { position: 'asc' } } },
        },
      },
    });
  }

  async getProjectWithBoard(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        columns: {
          orderBy: { position: 'asc' },
          include: { tasks: { orderBy: { position: 'asc' } } },
        },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async listProjects(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (user.role === 'admin') {
      return this.prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          team: true,
          columns: {
            orderBy: { position: 'asc' },
            include: { tasks: { orderBy: { position: 'asc' } } },
          },
        },
      });
    }

    // teams where user is a member
    const memberships = await this.prisma.teamMember.findMany({
      where: { userId },
      select: { teamId: true },
    });
    const teamIds = memberships.map((m) => m.teamId);

    const projects = await this.prisma.project.findMany({
      where: {
        OR: [
          { teamId: { in: teamIds.length ? teamIds : ['__none__'] } },
          {
            columns: {
              some: {
                tasks: { some: { assigneeId: userId } },
              },
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        team: true,
        columns: {
          orderBy: { position: 'asc' },
          include: { tasks: { orderBy: { position: 'asc' } } },
        },
      },
    });

    return projects;
  }

  // permission helpers

  async userIsAdmin(userId: string) {
    const u = await this.prisma.user.findUnique({ where: { id: userId } });
    return !!u && u.role === 'admin';
  }

  async userMembershipRoleForTeam(userId: string, teamId: string) {
    const m = await this.prisma.teamMember.findFirst({
      where: { userId, teamId },
    });
    return m?.role ?? null; // 'owner'|'admin'|'member' or null
  }

  async userCanManageProject(userId: string, projectId: string) {
    if (await this.userIsAdmin(userId)) return true;

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException('Project not found');

    if (!project.teamId) return false;
    const role = await this.userMembershipRoleForTeam(userId, project.teamId);
    return role === 'owner' || role === 'admin';
  }

  // to resolve projectId from a column
  async getProjectIdFromColumn(columnId: string) {
    const col = await this.prisma.boardColumn.findUnique({
      where: { id: columnId },
    });
    if (!col) throw new NotFoundException('Column not found');
    return col.projectId;
  }

  async getProjectIdFromTask(taskId: string) {
    const t = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!t) throw new NotFoundException('Task not found');
    const col = await this.prisma.boardColumn.findUnique({
      where: { id: t.columnId },
    });
    if (!col) throw new NotFoundException('Column not found');
    return col.projectId;
  }

  // columns/tasks CRUD (core functionality unchanged)
  async createColumn(projectId: string, title: string, position = 0) {
    const max = await this.prisma.boardColumn.findFirst({
      where: { projectId },
      orderBy: { position: 'desc' },
      select: { position: true },
    });
    const pos = position ?? (max ? max.position + 1 : 0);
    return this.prisma.boardColumn.create({
      data: { title, projectId, position: pos },
    });
  }

  async deleteColumnIfEmpty(columnId: string) {
    const tasksCount = await this.prisma.task.count({ where: { columnId } });
    if (tasksCount > 0) throw new BadRequestException('Column not empty');
    return this.prisma.boardColumn.delete({ where: { id: columnId } });
  }

  async createTask(
    columnId: string,
    title: string,
    description?: string,
    assigneeId?: string,
    position?: number,
  ) {
    const max = await this.prisma.task.findFirst({
      where: { columnId },
      orderBy: { position: 'desc' },
      select: { position: true },
    });
    const pos =
      typeof position === 'number' ? position : max ? max.position + 1 : 0;
    return this.prisma.task.create({
      data: {
        title,
        description: description || null,
        columnId,
        position: pos,
        assigneeId: assigneeId || null,
      },
    });
  }

  // backend/src/projects/projects.service.ts
  updateTask(
    taskId: string,
    data: {
      title?: string;
      description?: string;
      assigneeId?: string | null;
      status?: string;
    },
  ) {
    const payload: any = { ...data };

    return this.prisma.task.update({
      where: { id: taskId },
      data: payload,
    });
  }

  async moveTask(
    taskId: string,
    targetColumnId: string,
    targetPosition: number,
  ) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    await this.prisma.$transaction([
      this.prisma.task.updateMany({
        where: { columnId: targetColumnId, position: { gte: targetPosition } },
        data: { position: { increment: 1 } },
      }),
      this.prisma.task.update({
        where: { id: taskId },
        data: { columnId: targetColumnId, position: targetPosition },
      }),
    ]);

    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  async deleteTask(taskId: string) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }
  async getTaskById(taskId: string) {
    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  async updateProject(
    projectId: string,
    updates: {
      name?: string;
      description?: string;
      teamId?: string | null;
      dueDate?: Date | null;
    },
    actorUserId: string,
  ) {
    // fetch project and actor role
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException('Project not found');

    // permission: allow if actor is global admin or actor is owner/admin of current project team OR of new team (we check team membership)
    const actor = await this.prisma.user.findUnique({
      where: { id: actorUserId },
      select: { role: true },
    });
    if (actor?.role !== 'admin') {
      // if changing team, ensure actor is member+owner/admin of either current team or target team
      const targetTeamId = updates.teamId ?? project.teamId;
      // targetTeamId could be null -> deny
      if (!targetTeamId) {
        throw new ForbiddenException('Not allowed to edit project');
      }

      const membership = await this.prisma.teamMember.findFirst({
        where: { teamId: targetTeamId, userId: actorUserId },
        select: { role: true },
      });
      if (!membership || !['owner', 'admin'].includes(membership.role)) {
        throw new ForbiddenException('Not allowed to edit project');
      }
    }

    // if team is changing, unassign ALL tasks in this project (set assigneeId=null)
    if (updates.teamId !== undefined && updates.teamId !== project.teamId) {
      await this.prisma.task.updateMany({
        where: { column: { projectId } }, // using relation traversal
        data: { assigneeId: null },
      });
    }

    // perform update
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        name: updates.name,
        description: updates.description,
        teamId: updates.teamId ?? undefined,
        dueDate: updates.dueDate ?? undefined,
      },
    });
  }

  // deleteProject (cascades)
  async deleteProject(projectId: string, actorUserId: string) {
    // permission: admin or team owner/admin
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { teamId: true },
    });
    if (!project) throw new NotFoundException('Project not found');

    const actor = await this.prisma.user.findUnique({
      where: { id: actorUserId },
      select: { role: true },
    });
    if (actor?.role !== 'admin') {
      // if project has no team, only admin can delete it
      if (!project.teamId) {
        throw new ForbiddenException('Not allowed to delete project');
      }

      const membership = await this.prisma.teamMember.findFirst({
        where: { teamId: project.teamId, userId: actorUserId },
        select: { role: true },
      });
      if (!membership || !['owner', 'admin'].includes(membership.role)) {
        throw new ForbiddenException('Not allowed to delete project');
      }
    }

    // delete columns and tasks via cascades — ensure Prisma schema supports relations with onDelete: Cascade or do manual deletes
    // Safe path: delete tasks -> delete columns -> delete project
    await this.prisma.task.deleteMany({
      where: { column: { projectId } },
    });
    await this.prisma.boardColumn.deleteMany({ where: { projectId } });
    return this.prisma.project.delete({ where: { id: projectId } });
  }
}
