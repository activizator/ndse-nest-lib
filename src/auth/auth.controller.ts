import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../models/interfaces/user.interface';
import { JWTAuthGuard } from '../guards/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JWTAuthGuard)
  @Post('/api/users/signin')
  signinUser(@Body() user: User): Promise<any> {
    return this.authService.login(user);
  }
}
