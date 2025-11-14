import { IsString, IsInt } from 'class-validator';

export class MoveTaskDto {
  @IsString()
  targetColumnId: string;

  @IsInt()
  targetPosition: number; // new position in target column
}
