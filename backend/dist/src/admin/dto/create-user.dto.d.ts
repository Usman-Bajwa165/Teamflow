export declare class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role?: 'admin' | 'member' | 'owner';
}
