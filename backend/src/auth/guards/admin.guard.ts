import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request & { user?: any };
    const user = req.user;
    if (!user) throw new ForbiddenException('No authenticated user');
    // token may include role, else ensure your JwtGuard fills role
    if (user.role === 'admin') return true;
    throw new ForbiddenException('Admin access required');
  }
}
