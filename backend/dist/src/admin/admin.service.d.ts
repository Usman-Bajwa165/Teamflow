import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        createdAt: Date;
    }[]>;
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
    }>;
    updateUserRole(userId: string, role: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
    }>;
    deleteUser(userId: string): Promise<{
        ok: boolean;
    }>;
}
