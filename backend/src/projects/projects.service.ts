import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  createProject(name: string, description?: string) {
    return this.prisma.project.create({
      data: { name, description },
    });
  }

  async getProjectWithBoard(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        columns: {
          orderBy: { position: 'asc' },
          include: {
            tasks: { orderBy: { position: 'asc' } },
          },
        },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async createColumn(projectId: string, title: string, position = 0) {
    // adjust positions of other columns if necessary (simple approach: append)
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

  async createTask(
    columnId: string,
    title: string,
    description?: string,
    assigneeId?: string,
    position?: number,
  ) {
    // find max position in column
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
        description,
        columnId,
        position: pos,
        assigneeId: assigneeId || null,
      },
    });
  }

  updateTask(
    taskId: string,
    data: { title?: string; description?: string; assigneeId?: string },
  ) {
    return this.prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  async moveTask(
    taskId: string,
    targetColumnId: string,
    targetPosition: number,
  ) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    // Simple algorithm: increment positions >= targetPosition in target column
    await this.prisma.$transaction([
      this.prisma.task.updateMany({
        where: { columnId: targetColumnId, position: { gte: targetPosition } },
        data: { position: { increment: 1 } },
      }),
      this.prisma.task.update({
        where: { id: taskId },
        data: { columnId: targetColumnId, position: targetPosition },
      }),
      // optionally compress old column positions (not implemented here)
    ]);

    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  deleteTask(taskId: string) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  listProjects() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        columns: {
          orderBy: { position: 'asc' },
          include: {
            tasks: { orderBy: { position: 'asc' } },
          },
        },
      },
    });
  }
}
