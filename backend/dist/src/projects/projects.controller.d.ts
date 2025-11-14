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
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                position: number;
                title: string;
                columnId: string;
                assigneeId: string | null;
                status: import("@prisma/client").$Enums.TaskStatus;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            title: string;
            projectId: string;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
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
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                position: number;
                title: string;
                columnId: string;
                assigneeId: string | null;
                status: import("@prisma/client").$Enums.TaskStatus;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            title: string;
            projectId: string;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
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
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                position: number;
                title: string;
                columnId: string;
                assigneeId: string | null;
                status: import("@prisma/client").$Enums.TaskStatus;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            title: string;
            projectId: string;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
    createColumn(id: string, dto: CreateColumnDto, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        projectId: string;
    }>;
    deleteColumn(columnId: string, req: JwtRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        projectId: string;
    }>;
    createTask(columnId: string, dto: CreateTaskDto, req: JwtRequest): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
    }>;
    moveTask(taskId: string, dto: MoveTaskDto, req: JwtRequest): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
    } | null>;
    updateTask(taskId: string, dto: UpdateTaskDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
    }>;
    deleteTask(taskId: string, req: JwtRequest): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
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
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
    deleteProject(id: string, req: Request & {
        user?: any;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
}
export {};
