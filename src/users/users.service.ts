import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) throw new HttpException('Nenhum usuário encontrado.', 404);

    return {
      message: 'Usuário encontrado',
      result: user,
    };
  }

  async createUser(body: CreateUserDto) {
    const userCreated = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash: body.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      message: 'Usuário criado com sucesso',
      user: userCreated,
    };
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const userSelected = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!userSelected) throw new HttpException('Usuário não encontrado.', 404);

    const userUpdated = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: body.name ?? userSelected.name,
        email: userSelected.email,
        passwordHash: body.password ?? userSelected.passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      message: 'Usuário atualizado com sucesso',
      user: userUpdated,
    };
  }

  async deleterUser(id: number) {
    const userSelected = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!userSelected) throw new HttpException('Usuário não encontrado.', 404);

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Usuário deletado com sucesso.',
    };
  }
}
