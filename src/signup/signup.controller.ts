import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { User } from './interfaces/user.interface';

@Controller('/api/users/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  signupUser(@Body() user: User): Promise<User> {
    return this.signupService.create(user);
  }
}
