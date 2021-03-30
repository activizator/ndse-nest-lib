import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../models/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private usersService: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<boolean> {
    const user = await this.usersService.findById({ _id: id });
    const hash = user.pass;

    if (user && (await bcrypt.compare(pass, hash))) {
      return true;
    }
    return false;
  }

  async login(user: any) {
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
