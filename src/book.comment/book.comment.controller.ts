import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { BookCommentService } from './book.comment.service';
import { BookComment } from './interfaces/book.comment.interface';

@Controller('api/book/comment')
export class BookCommentController {
  constructor(private readonly bookCommentService: BookCommentService) {}

  @Get(':bookId')
  getComments(@Param() bookId: string): Promise<BookComment[]> {
    return this.bookCommentService.findAllBookComment(bookId);
  }

  @Get(':id')
  getComment(@Param() id: number): Promise<BookComment> {
    return this.bookCommentService.read(id);
  }

  @Post()
  pushComment(@Body() comment: BookComment): Promise<BookComment> {
    return this.bookCommentService.create(comment);
  }

  @Put(':id')
  upsertComment(
    @Param() id: number,
    @Body() comment: BookComment,
  ): Promise<BookComment> {
    return this.bookCommentService.upsert(id, comment);
  }

  @Delete(':id')
  deleteComment(@Param() id: number): Promise<BookComment> {
    return this.bookCommentService.delete(id);
  }
}
