import { Module } from '@nestjs/common';
import { BookCommentController } from './book.comment.controller';
import { BookCommentService } from './book.comment.service';

@Module({
  controllers: [BookCommentController],
  providers: [BookCommentService]
})
export class BookCommentModule {}
