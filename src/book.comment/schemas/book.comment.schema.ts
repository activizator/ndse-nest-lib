import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  comment: string;
}

export const BookSchema = SchemaFactory.createForClass(BookComment);
