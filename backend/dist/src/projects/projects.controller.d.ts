import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
interface JwtRequest extends Request {
    user?: {
        userId: string;
        role?: string;
    };
}
export declare class ProjectsController {
    private projects;
    constructor(projects: ProjectsService);
    createProject(dto: CreateProjectDto, req: JwtRequest): Promise<{
        team: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        columns: ({
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                position: number;
                status: import("@prisma/client").$Enums.TaskStatus;
                columnId: string;
                assigneeId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            projectId: string;
            position: number;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
    }>;
    listProjects(req: JwtRequest): Promise<({
        team: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        columns: ({
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                position: number;
                status: import("@prisma/client").$Enums.TaskStatus;
                columnId: string;
                assigneeId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            projectId: string;
            position: number;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
    })[]>;
    getProject(id: string): Promise<{
        team: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        columns: ({
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                position: number;
                status: import("@prisma/client").$Enums.TaskStatus;
                columnId: string;
                assigneeId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            projectId: string;
            position: number;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
    }>;
    createColumn(id: string, dto: CreateColumnDto, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        projectId: string;
        position: number;
    }>;
    deleteColumn(columnId: string, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        projectId: string;
        position: number;
    }>;
    createTask(columnId: string, dto: CreateTaskDto, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        position: number;
        status: import("@prisma/client").$Enums.TaskStatus;
        columnId: string;
        assigneeId: string | null;
    }>;
    moveTask(taskId: string, dto: MoveTaskDto, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        position: number;
        status: import("@prisma/client").$Enums.TaskStatus;
        columnId: string;
        assigneeId: string | null;
    } | null>;
    updateTask(taskId: string, dto: UpdateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        position: number;
        status: import("@prisma/client").$Enums.TaskStatus;
        columnId: string;
        assigneeId: string | null;
    }>;
    deleteTask(taskId: string, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        position: number;
        status: import("@prisma/client").$Enums.TaskStatus;
        columnId: string;
        assigneeId: string | null;
    }>;
    updateProject(id: string, body: {
        name?: string;
        description?: string;
        teamId?: string | null;
        dueDate?: string | null;
    }, req: Request & {
        user?: any;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
    }>;
    deleteProject(id: string, req: Request & {
        user?: any;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
    }>;
}
export {};
