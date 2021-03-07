import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './interfaces/book.interface';
import { IID } from './interfaces/id.interface';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  pushBook(@Body() book: Book): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put(':id')
  upsertBook(@Param() id: IID, @Body() book: Book): Promise<Book> {
    return this.bookService.upsert(id, book);
  }

  @Delete(':id')
  deleteBook(@Param() id: IID): Promise<Book> {
    return this.bookService.delete(id);
  }
}
