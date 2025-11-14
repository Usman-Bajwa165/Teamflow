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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const create_column_dto_1 = require("./dto/create-column.dto");
const create_task_dto_1 = require("./dto/create-task.dto");
const move_task_dto_1 = require("./dto/move-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ProjectsController = class ProjectsController {
    projects;
    constructor(projects) {
        this.projects = projects;
    }
    async createProject(dto, req) {
        const uid = req.user?.userId;
        const role = req.user?.role;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        if (role !== 'admin')
            throw new common_1.ForbiddenException('Only global admin can create projects');
        return this.projects.createProject(uid, dto.name, dto.description, dto.teamId, dto.dueDate);
    }
    async listProjects(req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        return this.projects.listProjects(uid);
    }
    async getProject(id) {
        return this.projects.getProjectWithBoard(id);
    }
    async createColumn(id, dto, req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        const allowed = await this.projects.userCanManageProject(uid, id);
        if (!allowed)
            throw new common_1.ForbiddenException('Only team owner/admin or global admin can add columns');
        return this.projects.createColumn(id, dto.title, dto.position);
    }
    async deleteColumn(columnId, req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        const projectId = await this.projects.getProjectIdFromColumn(columnId);
        const allowed = await this.projects.userCanManageProject(uid, projectId);
        if (!allowed)
            throw new common_1.ForbiddenException('Only team owner/admin or global admin can delete columns');
        return this.projects.deleteColumnIfEmpty(columnId);
    }
    async createTask(columnId, dto, req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        const projectId = await this.projects.getProjectIdFromColumn(columnId);
        const allowed = await this.projects.userCanManageProject(uid, projectId);
        if (!allowed)
            throw new common_1.ForbiddenException('Only team owner/admin or global admin can add tasks');
        return this.projects.createTask(columnId, dto.title, dto.description, dto.assigneeId, dto.position);
    }
    async moveTask(taskId, dto, req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        const projectId = await this.projects.getProjectIdFromTask(taskId);
        const allowed = await this.projects.userCanManageProject(uid, projectId);
        if (!allowed)
            throw new common_1.ForbiddenException('Only team owner/admin or global admin can move tasks');
        if (!dto || !dto.targetColumnId)
            throw new common_1.BadRequestException('targetColumnId is required');
        return this.projects.moveTask(taskId, dto.targetColumnId, dto.targetPosition);
    }
    async updateTask(taskId, dto) {
        const payload = {};
        if (dto.title !== undefined)
            payload.title = dto.title;
        if (dto.description !== undefined)
            payload.description = dto.description;
        if (Object.prototype.hasOwnProperty.call(dto, 'assigneeId')) {
            payload.assigneeId = dto.assigneeId;
        }
        if (dto.status !== undefined)
            payload.status = dto.status;
        return this.projects.updateTask(taskId, payload);
    }
    async deleteTask(taskId, req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.BadRequestException('Missing auth user');
        const projectId = await this.projects.getProjectIdFromTask(taskId);
        const allowed = await this.projects.userCanManageProject(uid, projectId);
        if (!allowed)
            throw new common_1.ForbiddenException('Only team owner/admin or global admin can delete tasks');
        return this.projects.deleteTask(taskId);
    }
    async updateProject(id, body, req) {
        const uid = req.user?.userId ?? req.user?.id ?? req.user?.sub;
        if (!uid)
            throw new common_1.BadRequestException('Missing authenticated user');
        const updates = {
            name: body.name,
            description: body.description,
            teamId: body.teamId ?? null,
            dueDate: body.dueDate ? new Date(body.dueDate) : null,
        };
        return this.projects.updateProject(id, updates, String(uid));
    }
    async deleteProject(id, req) {
        const uid = req.user?.userId ?? req.user?.id ?? req.user?.sub;
        if (!uid)
            throw new common_1.BadRequestException('Missing authenticated user');
        return this.projects.deleteProject(id, String(uid));
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "listProjects", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProject", null);
__decorate([
    (0, common_1.Post)(':id/columns'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_column_dto_1.CreateColumnDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createColumn", null);
__decorate([
    (0, common_1.Delete)('/columns/:columnId'),
    __param(0, (0, common_1.Param)('columnId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteColumn", null);
__decorate([
    (0, common_1.Post)('/columns/:columnId/tasks'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('columnId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createTask", null);
__decorate([
    (0, common_1.Patch)('/tasks/:taskId/move'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, move_task_dto_1.MoveTaskDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "moveTask", null);
__decorate([
    (0, common_1.Patch)('/tasks/:taskId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)('/tasks/:taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map