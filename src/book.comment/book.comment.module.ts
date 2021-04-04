import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookCommentController,
  BookCommentsController,
} from './book.comment.controller';
import { BookCommentService } from './book.comment.service';
import { BookCommentSchema } from './schemas/book.comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BookComment', schema: BookCommentSchema },
    ]),
  ],
  controllers: [BookCommentController, BookCommentsController],
  providers: [BookCommentService],
})
export class BookCommentModule {}
