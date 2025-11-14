// backend/src/projects/projects.controller.ts
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface JwtRequest extends Request {
  user?: { userId: string; role?: string };
}

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  // Only global admin can create projects (per your confirmation)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProject(@Body() dto: CreateProjectDto, @Req() req: JwtRequest) {
    const uid = req.user?.userId;
    const role = req.user?.role;
    if (!uid) throw new BadRequestException('Missing auth user');
    if (role !== 'admin')
      throw new ForbiddenException('Only global admin can create projects');
    return this.projects.createProject(
      uid,
      dto.name,
      dto.description,
      dto.teamId,
      dto.dueDate,
    );
  }

  @Get()
  async listProjects(@Req() req: JwtRequest) {
    const uid = req.user?.userId;
    if (!uid) throw new BadRequestException('Missing auth user');
    return this.projects.listProjects(uid);
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projects.getProjectWithBoard(id);
  }

  @Post(':id/columns')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createColumn(
    @Param('id') id: string,
    @Body() dto: CreateColumnDto,
    @Req() req: JwtRequest,
  ) {
    const uid = req.user?.userId;
    if (!uid) throw new BadRequestException('Missing auth user');

    const allowed = await this.projects.userCanManageProject(uid, id);
    if (!allowed)
      throw new ForbiddenException(
        'Only team owner/admin or global admin can add columns',
      );
    return this.projects.createColumn(id, dto.title, dto.position);
  }

  @Delete('/columns/:columnId')
  async deleteColumn(
    @Param('columnId') columnId: string,
    @Req() req: JwtRequest,
  ) {
    const uid = req.user?.userId;
    if (!uid) throw new BadRequestException('Missing auth user');

    const projectId = await this.projects.getProjectIdFromColumn(columnId);
    const allowed = await this.projects.userCanManageProject(uid, projectId);
    if (!allowed)
      throw new ForbiddenException(
        'Only team owner/admin or global admin can delete columns',
      );
    return this.projects.deleteColumnIfEmpty(columnId);
  }

  @Post('/columns/:columnId/tasks')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTask(
    @Param('columnId') columnId: string,
    @Body() dto: CreateTaskDto,
    @Req() req: JwtRequest,
  ) {
    const uid = req.user?.userId;
    if (!uid) throw new BadRequestException('Missing auth user');

    const projectId = await this.projects.getProjectIdFromColumn(columnId);
    const allowed = await this.projects.userCanManageProject(uid, projectId);
    if (!allowed)
      throw new ForbiddenException(
        'Only team owner/admin or global admin can add tasks',
      );
    return this.projects.createTask(
      columnId,
      dto.title,
      dto.description,
      dto.assigneeId,
      dto.position,
    );
  }

  @Patch('/tasks/:taskId/move')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async moveTask(
    @Param('taskId') taskId: string,
    @Body() dto: MoveTaskDto,
    @Req() req: JwtRequest,
  ) {
    const uid = req.user?.userId;
    if (!uid) throw new BadRequestException('Missing auth user');

    const projectId = await this.projects.getProjectIdFromTask(taskId);
    const allowed = await this.projects.userCanManageProject(uid, projectId);
    if (!allowed)
      throw new ForbiddenException(
        'Only team owner/admin or global admin can move tasks',
      );
    if (!dto || !dto.targetColumnId)
      throw new BadRequestException('targetColumnId is required');
    return this.projects.moveTask(
      taskId,
      dto.targetColumnId,
      dto.targetPosition,
    );
  }

  @Patch('/tasks/:taskId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    // Build update payload carefully: only include assigneeId if client provided it (could be null)
    const payload: any = {};
    if (dto.title !== undefined) payload.title = dto.title;
    if (dto.description !== undefined) payload.description = dto.description;
    if (Object.prototype.hasOwnProperty.call(dto, 'assigneeId')) {
      // if client explicitly included assigneeId (could be null), pass as-is so Prisma sets null
      payload.assigneeId = dto.assigneeId;
    }

    // also allow status updates (if part of your DTO)
    if ((dto as any).status !== undefined) payload.status = (dto as any).status;

    return this.projects.updateTask(taskId, payload);
  }

  @Delete('/tasks/:taskId')
  async deleteTask(@Param('taskId') taskId: string, @Req() req: JwtRequest) {
    const uid = req.user?.userId;
    if (!uid) throw new BadRequestException('Missing auth user');

    const projectId = await this.projects.getProjectIdFromTask(taskId);
    const allowed = await this.projects.userCanManageProject(uid, projectId);
    if (!allowed)
      throw new ForbiddenException(
        'Only team owner/admin or global admin can delete tasks',
      );
    return this.projects.deleteTask(taskId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProject(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
      teamId?: string | null;
      dueDate?: string | null;
    },
    @Req() req: Request & { user?: any },
  ) {
    const uid = req.user?.userId ?? req.user?.id ?? req.user?.sub;
    if (!uid) throw new BadRequestException('Missing authenticated user');
    const updates = {
      name: body.name,
      description: body.description,
      teamId: body.teamId ?? null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    };
    return this.projects.updateProject(id, updates, String(uid));
  }

  @Delete(':id')
  async deleteProject(
    @Param('id') id: string,
    @Req() req: Request & { user?: any },
  ) {
    const uid = req.user?.userId ?? req.user?.id ?? req.user?.sub;
    if (!uid) throw new BadRequestException('Missing authenticated user');
    return this.projects.deleteProject(id, String(uid));
  }
}
