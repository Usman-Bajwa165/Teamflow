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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let TeamsService = class TeamsService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async createTeam(ownerId, name) {
        return this.prisma.team.create({
            data: {
                name,
                members: {
                    create: {
                        userId: ownerId,
                        role: 'owner',
                    },
                },
            },
            include: { members: true },
        });
    }
    async getTeamsForUser(userId) {
        const memberships = await this.prisma.teamMember.findMany({
            where: { userId },
            include: { team: true },
        });
        return memberships.map((m) => ({
            team: m.team,
            role: m.role,
            membershipId: m.id,
        }));
    }
    async getTeamMembers(teamId) {
        const members = await this.prisma.teamMember.findMany({
            where: { teamId },
            include: { user: { select: { id: true, email: true, name: true } } },
        });
        return members;
    }
    async inviteMemberByEmail(teamId, email, role = 'member') {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('User with that email not found');
        const existing = await this.prisma.teamMember.findFirst({
            where: { teamId, userId: user.id },
        });
        if (existing)
            throw new common_1.BadRequestException('User already a member');
        return this.prisma.teamMember.create({
            data: { teamId, userId: user.id, role },
        });
    }
    async changeMemberRole(teamId, memberId, newRole) {
        const member = await this.prisma.teamMember.findUnique({
            where: { id: memberId },
        });
        if (!member || member.teamId !== teamId)
            throw new common_1.NotFoundException('Member not found in team');
        return this.prisma.teamMember.update({
            where: { id: memberId },
            data: { role: newRole },
        });
    }
    async removeMember(teamId, memberId) {
        const member = await this.prisma.teamMember.findUnique({
            where: { id: memberId },
        });
        if (!member || member.teamId !== teamId)
            throw new common_1.NotFoundException('Member not found in team');
        return this.prisma.teamMember.delete({ where: { id: memberId } });
    }
    async findTeamById(teamId) {
        return this.prisma.team.findUnique({ where: { id: teamId } });
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map