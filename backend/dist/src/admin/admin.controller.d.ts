import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AdminController {
    private admin;
    constructor(admin: AdminService);
    listUsers(): Promise<{
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
    updateRole(id: string, dto: UpdateUserRoleDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
    }>;
    deleteUser(id: string): Promise<{
        ok: boolean;
    }>;
}
