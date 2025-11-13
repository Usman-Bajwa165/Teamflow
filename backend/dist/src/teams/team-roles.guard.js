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
exports.TeamRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const team_roles_decorator_1 = require("./team-roles.decorator");
const prisma_service_1 = require("../prisma/prisma.service");
let TeamRolesGuard = class TeamRolesGuard {
    reflector;
    prisma;
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(team_roles_decorator_1.TEAM_ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles || requiredRoles.length === 0)
            return true;
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user || !user.userId)
            return false;
        const teamId = req.params?.id || req.params?.teamId || req.body?.teamId;
        if (!teamId)
            return false;
        const member = await this.prisma.teamMember.findFirst({
            where: { teamId: teamId, userId: user.userId },
        });
        if (!member)
            return false;
        return requiredRoles.includes(member.role);
    }
};
exports.TeamRolesGuard = TeamRolesGuard;
exports.TeamRolesGuard = TeamRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], TeamRolesGuard);
//# sourceMappingURL=team-roles.guard.js.map