import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { MailerService } from '../mailer/mailer.service';

type MinimalUserForTokens = {
  id: string | number;
  email?: string;
  role?: string;
  name?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailer: MailerService,
  ) {}

  private getAccessTokenPayload(user: MinimalUserForTokens) {
    return { sub: user.id, email: user.email, role: user.role };
  }

  // getTokens is synchronous (jwtService.sign is synchronous). Removing `async`
  // removes the `require-await` lint warning while callers may still `await` it.
  getTokens(user: MinimalUserForTokens): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = this.getAccessTokenPayload(user);

    // Accept numeric-only env values as numbers, otherwise keep string (e.g. '7d' or '900s')
    const accessExpires: string | number =
      process.env.JWT_ACCESS_EXPIRES_IN &&
      /^\d+$/.test(process.env.JWT_ACCESS_EXPIRES_IN)
        ? Number(process.env.JWT_ACCESS_EXPIRES_IN)
        : (process.env.JWT_ACCESS_EXPIRES_IN ?? '900s');

    const refreshExpires: string | number =
      process.env.JWT_REFRESH_EXPIRES_IN &&
      /^\d+$/.test(process.env.JWT_REFRESH_EXPIRES_IN)
        ? Number(process.env.JWT_REFRESH_EXPIRES_IN)
        : (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d');

    const accessToken = this.jwtService.sign(
      payload as any,
      { expiresIn: accessExpires } as any,
    );
    const refreshToken = this.jwtService.sign(
      { sub: user.id } as any,
      { expiresIn: refreshExpires } as any,
    );

    return { accessToken, refreshToken };
  }

  async register(email: string, password: string, name?: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');
    return this.usersService.createUser(email, password, name);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const valid = await this.usersService.verifyPassword(user, password);
    if (!valid) return null;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // getTokens is synchronous; callers can still `await` it safely
    const tokens = this.getTokens(user as MinimalUserForTokens);

    // hash refresh token before saving
    const hash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.setRefreshToken(user.id, hash);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens,
    };
  }

  async logout(userId: string) {
    await this.usersService.setRefreshToken(userId, null);
    return { ok: true };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.hashedRefreshToken) throw new UnauthorizedException();

    const matches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!matches) throw new UnauthorizedException();

    const tokens = this.getTokens(user as MinimalUserForTokens);
    const newHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.setRefreshToken(user.id, newHash);

    return {
      tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  // Verify a refresh token, extract userId and refresh
  async refreshUsingToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      // runtime check: ensure decoded.sub exists and is string|number
      if (!decoded || typeof decoded !== 'object')
        throw new UnauthorizedException('Invalid refresh token');

      const maybeSub = (decoded as { sub?: unknown }).sub;
      if (typeof maybeSub !== 'string' && typeof maybeSub !== 'number') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const userId = String(maybeSub); // ensure string for refreshTokens
      return this.refreshTokens(userId, refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Password reset (create token and store its SHA256 hash)
  async createPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // per your earlier request, show explicit message
      throw new BadRequestException('Email not found. Please register first.');
    }

    const raw = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(raw).digest('hex');

    const expires = new Date(
      Date.now() +
        Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_MINUTES || 60) *
          60 *
          1000,
    );

    await this.prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: expires,
      },
    });

    // Send real email (no terminal logging)
    await this.mailer.sendPasswordReset(user.email, raw);

    return {
      ok: true,
      message: 'Password reset email sent (check inbox).',
    };
  }

  async validateResetToken(rawToken: string) {
    if (!rawToken) return { valid: false, reason: 'missing' };

    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');
    const token = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!token) return { valid: false, reason: 'invalid' };
    if (token.used) return { valid: false, reason: 'used' };
    if (token.expiresAt < new Date())
      return { valid: false, reason: 'expired' };

    return { valid: true };
  }

  async resetPassword(rawToken: string, newPassword: string) {
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');
    const token = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
    if (!token) throw new BadRequestException('Invalid or expired token');
    if (token.used) throw new BadRequestException('Token already used');
    if (token.expiresAt < new Date())
      throw new BadRequestException('Token expired');

    // update user's password
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: token.userId },
      data: { password: hashed },
    });

    // mark token used
    await this.prisma.passwordResetToken.update({
      where: { id: token.id },
      data: { used: true },
    });

    return { ok: true };
  }
}
