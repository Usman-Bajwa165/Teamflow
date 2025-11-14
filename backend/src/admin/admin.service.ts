import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    // check unique email
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name ?? null,
        role: dto.role ?? 'member',
      },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  }

  async updateUserRole(userId: string, role: string) {
    const u = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!u) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, name: true, role: true },
    });
  }

  async deleteUser(userId: string) {
    // ensure user exists
    const u = await this.prisma.user.findUnique({
      where: { id: String(userId) },
    });
    if (!u) throw new NotFoundException('User not found');

    // Check if user is OWNER of any team via teamMember rows (safer)
    const ownerCount = await this.prisma.teamMember.count({
      where: { userId: String(userId), role: 'owner' },
    });
    if (ownerCount > 0) {
      throw new BadRequestException(
        'User owns one or more teams. Reassign or delete those teams before deleting this user.',
      );
    }

    // Perform deletions / cleanup in a transaction:
    // 1) Unassign tasks assigned to this user
    // 2) Remove their team memberships
    // 3) Delete any password reset tokens for this user (if model exists)
    // 4) Delete the user
    //
    // NOTE: if your Prisma schema uses a different model name for password reset tokens,
    // update `passwordResetToken` below to the correct model name.
    const txOps: any[] = [
      this.prisma.task.updateMany({
        where: { assigneeId: String(userId) },
        data: { assigneeId: null },
      }),
      this.prisma.teamMember.deleteMany({
        where: { userId: String(userId) },
      }),
    ];

    // Attempt to delete password reset tokens if the model exists in Prisma client.
    // Using optional chaining to avoid runtime crash if the model is not present (TS will still
    // require correct type — if you get a TS error, replace this with the actual model name).
    if ((this.prisma as any).passwordResetToken) {
      txOps.push(
        (this.prisma as any).passwordResetToken.deleteMany({
          where: { userId: String(userId) },
        }),
      );
    }

    // Finally delete the user
    txOps.push(
      this.prisma.user.delete({
        where: { id: String(userId) },
      }),
    );

    // Run transaction
    await this.prisma.$transaction(txOps);

    return { ok: true };
  }
}
