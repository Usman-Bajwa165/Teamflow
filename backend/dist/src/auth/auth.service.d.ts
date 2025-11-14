import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
type MinimalUserForTokens = {
    id: string | number;
    email?: string;
    role?: string;
    name?: string;
};
export declare class AuthService {
    private usersService;
    private prisma;
    private jwtService;
    constructor(usersService: UsersService, prisma: PrismaService, jwtService: JwtService);
    private getAccessTokenPayload;
    getTokens(user: MinimalUserForTokens): {
        accessToken: string;
        refreshToken: string;
    };
    register(email: string, password: string, name?: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        createdAt: Date;
    }>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
    } | null>;
    login(email: string, password: string): Promise<{
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
    logout(userId: string): Promise<{
        ok: boolean;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
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
    refreshUsingToken(refreshToken: string): Promise<{
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
    createPasswordReset(email: string): Promise<{
        ok: boolean;
    } | undefined>;
    resetPassword(rawToken: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
}
export {};
