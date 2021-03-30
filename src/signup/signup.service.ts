import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/interfaces/user.interface';
import { UserDocument } from '../models/schemas/user.schema';

@Injectable()
export class SignupService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<any> {
    const { email, firstName, lastName } = user;
    let { pass } = user;

    const salt = parseInt(process.env.SAULT);
    pass = await bcrypt.hash(pass, salt);

    const U = this.userModel;
    return U.init()
      .then(() => {
        const user = U.create({
          email,
          firstName,
          lastName,
          pass,
        });
        return user;
      })
      .then((usr) => {
        const user = {
          user: usr.email,
          firstName: usr.firstName,
          lastName: usr.lastName,
        };
        return user;
      })
      .catch((error) => {
        throw new Error('login is already in use');
      });
  }
}
