import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from 'generated/prisma';

@Controller('user')
export class UserController {
  constructor(private userSErvice: UserService) {}

  @Post('user')
  async signUpUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userSErvice.createUser(userData);
  }
}
