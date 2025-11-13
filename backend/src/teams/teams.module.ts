import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { TeamRolesGuard } from './team-roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [TeamsService, TeamRolesGuard, Reflector],
  controllers: [TeamsController],
  exports: [TeamsService],
})
export class TeamsModule {}
