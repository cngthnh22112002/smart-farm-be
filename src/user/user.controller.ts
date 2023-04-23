import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get()
  async getCurrentUser(@Request() req): Promise<User> {
      return this.userService.getCurrentUser(req.user);
  }

  @UseGuards(AuthGuard())
  @Put()
  async updateUser(@Request() req, @Body() updateUser: UpdateUserDto): Promise<User> {
      return this.userService.updateUser(req.user, updateUser);
  } 
}
