import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { UserDocument } from './schemas/user.schema';

@Injectable()
// to do: validation
export class SignupService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<any> {
    try {
      const { email, firstName, lastName } = user;
      let { pass } = user;

      const salt = parseInt(process.env.SAULT);
      pass = await bcrypt.hash(pass, salt);

      await this.userModel.create({
        email,
        firstName,
        lastName,
        pass,
      });

      return {
        email,
        firstName,
        lastName,
      };
    } catch {
      throw new Error('login is already in use');
    }
  }
}
