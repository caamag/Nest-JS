import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  limit: number;

  @Min(0)
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset: number;
}
