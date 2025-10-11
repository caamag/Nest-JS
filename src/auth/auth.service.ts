import { HttpException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hash: HashingServiceProtocol,
  ) {}

  async authenticate(signInData: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: signInData.email,
      },
    });

    if (!user) throw new HttpException('Falha ao realizar login', 404);

    const passwordIsValid = await this.hash.compare(
      signInData.password,
      user.passwordHash,
    );

    if (!passwordIsValid)
      throw new HttpException('Email e/ou senha incorreta', 400);

    return {
      message: 'Usuário logado com sucesso',
      data: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
