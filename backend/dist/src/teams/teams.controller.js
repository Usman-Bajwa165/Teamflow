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
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const teams_service_1 = require("./teams.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_team_dto_1 = require("./dto/create-team.dto");
const invite_member_dto_1 = require("./dto/invite-member.dto");
const team_roles_decorator_1 = require("./team-roles.decorator");
const team_roles_guard_1 = require("./team-roles.guard");
const update_member_role_dto_1 = require("./dto/update-member-role.dto");
let TeamsController = class TeamsController {
    teams;
    constructor(teams) {
        this.teams = teams;
    }
    async create(req, dto) {
        if (!dto || !dto.name)
            throw new common_1.BadRequestException('Team name is required');
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.UnauthorizedException('Missing authenticated user');
        return this.teams.createTeam(uid, dto.name);
    }
    async myTeams(req) {
        const uid = req.user?.userId;
        if (!uid)
            throw new common_1.UnauthorizedException('Missing authenticated user');
        return this.teams.getTeamsForUser(uid);
    }
    async members(id) {
        return this.teams.getTeamMembers(id);
    }
    async invite(id, dto) {
        return this.teams.inviteMemberByEmail(id, dto.email, dto.role || 'member');
    }
    async changeRole(id, memberId, dto) {
        return this.teams.changeMemberRole(id, memberId, dto.role);
    }
    async removeMember(id, memberId) {
        return this.teams.removeMember(id, memberId);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "myTeams", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, common_1.UseGuards)(team_roles_guard_1.TeamRolesGuard),
    (0, team_roles_decorator_1.TeamRoles)('owner', 'admin', 'member'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "members", null);
__decorate([
    (0, common_1.Post)(':id/invite'),
    (0, common_1.UseGuards)(team_roles_guard_1.TeamRolesGuard),
    (0, team_roles_decorator_1.TeamRoles)('owner', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, invite_member_dto_1.InviteMemberDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "invite", null);
__decorate([
    (0, common_1.Patch)(':id/members/:memberId/role'),
    (0, common_1.UseGuards)(team_roles_guard_1.TeamRolesGuard),
    (0, team_roles_decorator_1.TeamRoles)('owner', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('memberId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_member_role_dto_1.UpdateMemberRoleDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "changeRole", null);
__decorate([
    (0, common_1.Delete)(':id/members/:memberId'),
    (0, common_1.UseGuards)(team_roles_guard_1.TeamRolesGuard),
    (0, team_roles_decorator_1.TeamRoles)('owner', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "removeMember", null);
exports.TeamsController = TeamsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
//# sourceMappingURL=teams.controller.js.map