import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TEAM_ROLES_KEY } from './team-roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      TEAM_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles configured, allow by default
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.userId) return false;

    // teamId can come from param `id` or param `teamId` or body.teamId
    const teamId = req.params?.id || req.params?.teamId || req.body?.teamId;
    if (!teamId) return false;

    const member = await this.prisma.teamMember.findFirst({
      where: { teamId: teamId, userId: user.userId },
    });

    if (!member) return false;

    return requiredRoles.includes(member.role);
  }
}
