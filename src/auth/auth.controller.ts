import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  signIn(@Body() signInData: SignInDto) {
    return this.service.authenticate(signInData);
  }
}
