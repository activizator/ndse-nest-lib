import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { Model } from 'mongoose';
import { UserDocument } from '../models/schemas/user.schema';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    @InjectModel('User') private usersService: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.findOne({ email: request.body.email });
    return await this.authService.validateUser(user._id, request.body.pass);
  }
}
