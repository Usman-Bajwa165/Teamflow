import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  // list all users
  @Get('users')
  listUsers() {
    return this.admin.getAllUsers();
  }

  // create a new user (admin-only)
  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    if (!dto.email || !dto.password)
      throw new BadRequestException('email+password required');
    return this.admin.createUser(dto);
  }

  // change role
  @Patch('users/:id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    return this.admin.updateUserRole(id, dto.role);
  }

  // delete user
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.admin.deleteUser(id);
  }
}
