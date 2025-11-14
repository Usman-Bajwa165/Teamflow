// backend/src/projects/dto/create-project.dto.ts
import {
  IsString,
  IsUUID,
  Length,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @Length(2, 200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  teamId: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
