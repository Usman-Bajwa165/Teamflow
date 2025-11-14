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
  user?: { userId: string };
}

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createProject(@Body() dto: CreateProjectDto, @Req() req: JwtRequest) {
    if (!dto || !dto.name)
      throw new BadRequestException('Project name is required');
    return this.projects.createProject(dto.name, dto.description);
  }

  @Get()
  listProjects() {
    return this.projects.listProjects();
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projects.getProjectWithBoard(id);
  }

  @Post(':id/columns')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createColumn(@Param('id') id: string, @Body() dto: CreateColumnDto) {
    if (!dto || !dto.title)
      throw new BadRequestException('Column title is required');
    return this.projects.createColumn(id, dto.title, dto.position);
  }

  @Post('/columns/:columnId/tasks')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTask(
    @Param('columnId') columnId: string,
    @Body() dto: CreateTaskDto,
  ) {
    if (!dto || !dto.title)
      throw new BadRequestException('Task title is required');
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
  async moveTask(@Param('taskId') taskId: string, @Body() dto: MoveTaskDto) {
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
  updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.projects.updateTask(taskId, {
      title: dto.title,
      description: dto.description,
      assigneeId: dto.assigneeId,
    });
  }

  @Delete('/tasks/:taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.projects.deleteTask(taskId);
  }
}
