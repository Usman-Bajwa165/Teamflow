import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(name: string, description?: string): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getProjectWithBoard(projectId: string): Promise<{
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
    createColumn(projectId: string, title: string, position?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        projectId: string;
    }>;
    createTask(columnId: string, title: string, description?: string, assigneeId?: string, position?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    }>;
    updateTask(taskId: string, data: {
        title?: string;
        description?: string;
        assigneeId?: string;
    }): import("@prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    moveTask(taskId: string, targetColumnId: string, targetPosition: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
    } | null>;
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
}
