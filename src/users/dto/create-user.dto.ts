import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode estar vazio.' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email não pode estar vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
