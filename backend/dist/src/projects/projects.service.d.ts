import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(userId: string, name: string, description?: string, teamId?: string, dueDate?: string): Promise<{
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
    getProjectWithBoard(projectId: string): Promise<{
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
    listProjects(userId: string): Promise<({
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
    userIsAdmin(userId: string): Promise<boolean>;
    userMembershipRoleForTeam(userId: string, teamId: string): Promise<string | null>;
    userCanManageProject(userId: string, projectId: string): Promise<boolean>;
    getProjectIdFromColumn(columnId: string): Promise<string>;
    getProjectIdFromTask(taskId: string): Promise<string>;
    createColumn(projectId: string, title: string, position?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        projectId: string;
    }>;
    deleteColumnIfEmpty(columnId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        projectId: string;
    }>;
    createTask(columnId: string, title: string, description?: string, assigneeId?: string, position?: number): Promise<{
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
    updateTask(taskId: string, data: {
        title?: string;
        description?: string;
        assigneeId?: string | null;
        status?: string;
    }): import("@prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        title: string;
        columnId: string;
        assigneeId: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    moveTask(taskId: string, targetColumnId: string, targetPosition: number): Promise<{
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
    deleteTask(taskId: string): Promise<{
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
    getTaskById(taskId: string): Promise<{
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
    updateProject(projectId: string, updates: {
        name?: string;
        description?: string;
        teamId?: string | null;
        dueDate?: Date | null;
    }, actorUserId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
    deleteProject(projectId: string, actorUserId: string): Promise<{
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
