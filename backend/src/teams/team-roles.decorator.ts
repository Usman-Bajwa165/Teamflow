import { SetMetadata } from '@nestjs/common';

export const TEAM_ROLES_KEY = 'team_roles';
export const TeamRoles = (...roles: string[]) =>
  SetMetadata(TEAM_ROLES_KEY, roles);
