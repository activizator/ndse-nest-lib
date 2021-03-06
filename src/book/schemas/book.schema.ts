import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  authors: string;

  @Prop({ default: '' })
  favorite: string;

  @Prop({ default: 'http://placehold.it/200x300' })
  fileCover: string;

  @Prop()
  fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
