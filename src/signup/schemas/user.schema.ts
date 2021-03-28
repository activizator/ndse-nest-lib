import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: 'anon' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ required: true })
  pass: string;
}

export const UserSchema = SchemaFactory.createForClass(User);