import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, password: string, name?: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
    } | null>;
    setRefreshToken(userId: string, refreshTokenHash: string | null): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
    }>;
    verifyPassword(user: {
        password: string;
    }, plain: string): Promise<boolean>;
}
