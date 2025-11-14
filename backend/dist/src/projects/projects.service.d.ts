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
    userIsAdmin(userId: string): Promise<boolean>;
    userMembershipRoleForTeam(userId: string, teamId: string): Promise<string | null>;
    userCanManageProject(userId: string, projectId: string): Promise<boolean>;
    getProjectIdFromColumn(columnId: string): Promise<string>;
    getProjectIdFromTask(taskId: string): Promise<string>;
    createColumn(projectId: string, title: string, position?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        projectId: string;
        position: number;
    }>;
    deleteColumnIfEmpty(columnId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        projectId: string;
        position: number;
    }>;
    createTask(columnId: string, title: string, description?: string, assigneeId?: string, position?: number): Promise<{
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
    updateTask(taskId: string, data: {
        title?: string;
        description?: string;
        assigneeId?: string | null;
        status?: string;
    }): import("@prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        position: number;
        status: import("@prisma/client").$Enums.TaskStatus;
        columnId: string;
        assigneeId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    moveTask(taskId: string, targetColumnId: string, targetPosition: number): Promise<{
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
    deleteTask(taskId: string): Promise<{
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
    getTaskById(taskId: string): Promise<{
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
    updateProject(projectId: string, updates: {
        name?: string;
        description?: string;
        teamId?: string | null;
        dueDate?: Date | null;
    }, actorUserId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
        description: string | null;
        assignedAt: Date;
        dueDate: Date | null;
    }>;
    deleteProject(projectId: string, actorUserId: string): Promise<{
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
