import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hash.service';
import { type ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hash: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwt: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
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

    const token = await this.jwtService.signAsync(
      {
        sub: String(user.id),
        email: user.email,
      },
      {
        secret: this.jwt.secret,
        expiresIn: this.jwt.jwtTtl as any,
        audience: this.jwt.audience,
        issuer: this.jwt.issuer,
      },
    );

    return {
      message: 'Usuário logado com sucesso',
      data: {
        name: user.name,
        email: user.email,
        token: token,
      },
    };
  }
}
