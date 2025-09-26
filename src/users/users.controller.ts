import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  finuser(@Param('id') id: string) {
    return this.userService.findUser(Number(id));
  }

  @Post()
  createUser(@Body() Body: CreateUserDto) {
    return this.userService.createUser(Body);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() Body: UpdateUserDto) {
    return this.userService.updateUser(Number(id), Body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleterUser(Number(id));
  }
}
