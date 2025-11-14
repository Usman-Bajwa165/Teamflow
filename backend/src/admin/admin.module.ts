import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminGuard } from '../auth/guards/admin.guard';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, AdminGuard],
})
export class AdminModule {}
