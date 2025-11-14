"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProject(userId, name, description, teamId, dueDate) {
        if (!teamId)
            throw new common_1.BadRequestException('teamId is required');
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
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
    async getProjectWithBoard(projectId) {
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
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async listProjects(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
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
    async userIsAdmin(userId) {
        const u = await this.prisma.user.findUnique({ where: { id: userId } });
        return !!u && u.role === 'admin';
    }
    async userMembershipRoleForTeam(userId, teamId) {
        const m = await this.prisma.teamMember.findFirst({
            where: { userId, teamId },
        });
        return m?.role ?? null;
    }
    async userCanManageProject(userId, projectId) {
        if (await this.userIsAdmin(userId))
            return true;
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (!project.teamId)
            return false;
        const role = await this.userMembershipRoleForTeam(userId, project.teamId);
        return role === 'owner' || role === 'admin';
    }
    async getProjectIdFromColumn(columnId) {
        const col = await this.prisma.boardColumn.findUnique({
            where: { id: columnId },
        });
        if (!col)
            throw new common_1.NotFoundException('Column not found');
        return col.projectId;
    }
    async getProjectIdFromTask(taskId) {
        const t = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!t)
            throw new common_1.NotFoundException('Task not found');
        const col = await this.prisma.boardColumn.findUnique({
            where: { id: t.columnId },
        });
        if (!col)
            throw new common_1.NotFoundException('Column not found');
        return col.projectId;
    }
    async createColumn(projectId, title, position = 0) {
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
    async deleteColumnIfEmpty(columnId) {
        const tasksCount = await this.prisma.task.count({ where: { columnId } });
        if (tasksCount > 0)
            throw new common_1.BadRequestException('Column not empty');
        return this.prisma.boardColumn.delete({ where: { id: columnId } });
    }
    async createTask(columnId, title, description, assigneeId, position) {
        const max = await this.prisma.task.findFirst({
            where: { columnId },
            orderBy: { position: 'desc' },
            select: { position: true },
        });
        const pos = typeof position === 'number' ? position : max ? max.position + 1 : 0;
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
    updateTask(taskId, data) {
        const payload = { ...data };
        return this.prisma.task.update({
            where: { id: taskId },
            data: payload,
        });
    }
    async moveTask(taskId, targetColumnId, targetPosition) {
        const task = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
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
    async deleteTask(taskId) {
        return this.prisma.task.delete({ where: { id: taskId } });
    }
    async getTaskById(taskId) {
        return this.prisma.task.findUnique({ where: { id: taskId } });
    }
    async updateProject(projectId, updates, actorUserId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const actor = await this.prisma.user.findUnique({
            where: { id: actorUserId },
            select: { role: true },
        });
        if (actor?.role !== 'admin') {
            const targetTeamId = updates.teamId ?? project.teamId;
            if (!targetTeamId) {
                throw new common_1.ForbiddenException('Not allowed to edit project');
            }
            const membership = await this.prisma.teamMember.findFirst({
                where: { teamId: targetTeamId, userId: actorUserId },
                select: { role: true },
            });
            if (!membership || !['owner', 'admin'].includes(membership.role)) {
                throw new common_1.ForbiddenException('Not allowed to edit project');
            }
        }
        if (updates.teamId !== undefined && updates.teamId !== project.teamId) {
            await this.prisma.task.updateMany({
                where: { column: { projectId } },
                data: { assigneeId: null },
            });
        }
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
    async deleteProject(projectId, actorUserId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            select: { teamId: true },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const actor = await this.prisma.user.findUnique({
            where: { id: actorUserId },
            select: { role: true },
        });
        if (actor?.role !== 'admin') {
            if (!project.teamId) {
                throw new common_1.ForbiddenException('Not allowed to delete project');
            }
            const membership = await this.prisma.teamMember.findFirst({
                where: { teamId: project.teamId, userId: actorUserId },
                select: { role: true },
            });
            if (!membership || !['owner', 'admin'].includes(membership.role)) {
                throw new common_1.ForbiddenException('Not allowed to delete project');
            }
        }
        await this.prisma.task.deleteMany({
            where: { column: { projectId } },
        });
        await this.prisma.boardColumn.deleteMany({ where: { projectId } });
        return this.prisma.project.delete({ where: { id: projectId } });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map