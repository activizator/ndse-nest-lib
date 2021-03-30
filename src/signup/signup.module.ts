import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { UserSchema } from '../models/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
