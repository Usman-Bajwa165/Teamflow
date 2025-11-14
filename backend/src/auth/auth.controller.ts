import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface JwtRequest extends Request {
  user?: { userId: string; email?: string; role?: string };
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() dto: CreateUserDto) {
    return this.auth.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post('refresh')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async refresh(@Body() dto: RefreshDto) {
    // moved JWT verification into the service; controller is a thin wrapper now
    return this.auth.refreshUsingToken(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: JwtRequest) {
    const uid = req.user?.userId;
    if (!uid) return { ok: false };
    return this.auth.logout(uid);
  }

  @Post('validate-reset-token')
  async validateResetToken(@Body('token') token: string) {
    return this.auth.validateResetToken(token);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    await this.auth.createPasswordReset(email);
    return {
      ok: true,
      message:
        'If that email exists we sent a reset token (dev: logged to server)',
    };
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.token, dto.newPassword);
  }
}
