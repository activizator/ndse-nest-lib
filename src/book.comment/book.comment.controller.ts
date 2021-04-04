import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { BookCommentService } from './book.comment.service';
import { BookComment } from './interfaces/book.comment.interface';

@Controller('api/book/comments')
export class BookCommentsController {
  constructor(private readonly bookCommentService: BookCommentService) {}

  @Get(':bookId')
  getComments(@Param() bId): Promise<BookComment[]> {
    return this.bookCommentService.findAllBookComment(bId.bookId);
  }
}

@Controller('api/book/comment')
export class BookCommentController {
  constructor(private readonly bookCommentService: BookCommentService) {}

  @Get(':id')
  getComment(@Param() id): Promise<BookComment> {
    return this.bookCommentService.read(id.id);
  }

  @Post()
  pushComment(@Body() comment: BookComment): Promise<BookComment> {
    return this.bookCommentService.create(comment);
  }

  @Put(':id')
  upsertComment(
    @Param() id,
    @Body() comment: BookComment,
  ): Promise<BookComment> {
    return this.bookCommentService.upsert(id.id, comment);
  }

  @Delete(':id')
  deleteComment(@Param() id): Promise<BookComment> {
    return this.bookCommentService.delete(id.id);
  }
}
