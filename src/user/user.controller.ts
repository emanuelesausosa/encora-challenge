import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './models/dtos/UserDto';
import { UserService } from './user.service';
import { User } from './models/entities/User';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('new-user')
  saveNewUser(@Body() user: UserDto): User {
    return this.userService.saveNewUser(user);
  }

  @Get('all-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('user/:id')
  getUserById(id: string) {
    console.log(id);
    return this.userService.getUserById(id);
  }
}
