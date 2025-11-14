import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Request } from 'express';
import { ResetPasswordDto } from './dto/reset-password.dto';
interface JwtRequest extends Request {
    user?: {
        userId: string;
        email?: string;
        role?: string;
    };
}
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        createdAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refresh(dto: RefreshDto): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            id: string;
            email: string;
            name: string | null;
            role: string;
        };
    }>;
    logout(req: JwtRequest): Promise<{
        ok: boolean;
    }>;
    validateResetToken(token: string): Promise<{
        valid: boolean;
        reason: string;
    } | {
        valid: boolean;
        reason?: undefined;
    }>;
    requestPasswordReset(email: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        ok: boolean;
    }>;
}
export {};
