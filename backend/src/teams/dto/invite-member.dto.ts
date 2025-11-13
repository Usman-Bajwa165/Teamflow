import { IsEmail, IsOptional, IsString } from 'class-validator';

export class InviteMemberDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role?: string; // 'member' | 'admin' | 'owner' (we'll trust the string for now)
}
