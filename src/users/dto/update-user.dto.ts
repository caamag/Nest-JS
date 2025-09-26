import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  password?: string;
}
