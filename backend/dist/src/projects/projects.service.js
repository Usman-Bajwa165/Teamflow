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
    createProject(name, description) {
        return this.prisma.project.create({
            data: { name, description },
        });
    }
    async getProjectWithBoard(projectId) {
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
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
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
                description,
                columnId,
                position: pos,
                assigneeId: assigneeId || null,
            },
        });
    }
    updateTask(taskId, data) {
        return this.prisma.task.update({
            where: { id: taskId },
            data,
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
    deleteTask(taskId) {
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
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map