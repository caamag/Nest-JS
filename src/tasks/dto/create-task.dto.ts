import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5, { message: 'O nome precisa ter no mínimo cinco caracteres.' })
  @IsNotEmpty({ message: 'Nome não pode estar vazio.' })
  readonly name: string;

  @MaxLength(10, { message: 'A desrição não pode ter mais que 10 caracteres.' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
