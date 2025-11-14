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
const prisma_service_1 = require("../prisma/prisma.service");
let TeamRolesGuard = class TeamRolesGuard {
    reflector;
    prisma;
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user) {
            return false;
        }
        if (user.role === 'admin')
            return true;
        const uid = user.userId ?? user.id ?? user.sub;
        if (!uid)
            return false;
        if (!user.role) {
            const dbUser = await this.prisma.user.findUnique({
                where: { id: String(uid) },
                select: { role: true },
            });
            if (dbUser?.role === 'admin')
                return true;
            req.user.role = dbUser?.role;
        }
        const allowedRoles = this.reflector.get('team_roles', context.getHandler()) || [];
        if (!allowedRoles.length)
            return true;
        const params = req.params || {};
        const teamId = params.id ?? req.body?.teamId ?? req.query?.teamId;
        if (!teamId)
            return false;
        const member = await this.prisma.teamMember.findFirst({
            where: { teamId: String(teamId), userId: String(uid) },
            select: { role: true },
        });
        if (!member) {
            return false;
        }
        return allowedRoles.includes(member.role);
    }
};
exports.TeamRolesGuard = TeamRolesGuard;
exports.TeamRolesGuard = TeamRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], TeamRolesGuard);
//# sourceMappingURL=team-roles.guard.js.map