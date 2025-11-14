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
    };
}
export declare class ProjectsController {
    private projects;
    constructor(projects: ProjectsService);
    createProject(dto: CreateProjectDto, req: JwtRequest): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    listProjects(): import("@prisma/client").Prisma.PrismaPromise<({
        columns: ({
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                position: number;
                title: string;
                columnId: string;
                assigneeId: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
    })[]>;
    getProject(id: string): Promise<{
        columns: ({
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                position: number;
                title: string;
                columnId: string;
                assigneeId: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
    }>;
    createColumn(id: string, dto: CreateColumnDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        projectId: string;
    }>;
    createTask(columnId: string, dto: CreateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    }>;
    moveTask(taskId: string, dto: MoveTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    } | null>;
    updateTask(taskId: string, dto: UpdateTaskDto): import("@prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteTask(taskId: string): import("@prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
export {};
