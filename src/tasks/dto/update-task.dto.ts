import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  readonly name?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}
