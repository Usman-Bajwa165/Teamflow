// backend/src/teams/team-roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request & { user?: any };
    const user = req.user;

    if (!user) {
      // no user on request -> unauthorized
      return false;
    }

    // If token includes role and it's admin, allow immediately
    if (user.role === 'admin') return true;

    // If token doesn't include role, fetch user role from DB (resiliency)
    const uid = user.userId ?? user.id ?? user.sub;
    if (!uid) return false;

    if (!user.role) {
      const dbUser = await this.prisma.user.findUnique({
        where: { id: String(uid) },
        select: { role: true },
      });
      if (dbUser?.role === 'admin') return true;
      // put the role on req.user for future guards/controllers (optional)
      req.user.role = dbUser?.role;
    }

    // read metadata from @TeamRoles decorator
    const allowedRoles =
      this.reflector.get<string[]>('team_roles', context.getHandler()) || [];
    if (!allowedRoles.length) return true; // no restrictions

    // get teamId param (support common places)
    const params = (req.params as any) || {};
    const teamId = params.id ?? req.body?.teamId ?? req.query?.teamId;
    if (!teamId) return false;

    // find membership row (teamMember) for this user
    const member = await this.prisma.teamMember.findFirst({
      where: { teamId: String(teamId), userId: String(uid) },
      select: { role: true },
    });

    if (!member) {
      // not a member -> deny
      return false;
    }

    // allow if member.role is in allowedRoles
    return allowedRoles.includes(member.role);
  }
}
