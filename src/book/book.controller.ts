import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { BookValidationPipe } from '../pipes/validator';
import { updateBookSchema } from '../pipes/joiBookScheme';
import { BookService } from './book.service';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): Promise<any> {
    return this.bookService.findAll();
  }

  @Get(':id')
  getBook(@Param() id): Promise<any> {
    return this.bookService.read(id.id);
  }

  @Post()
  @UsePipes(new BookValidationPipe(updateBookSchema))
  pushBook(@Body() book: any): Promise<any> {
    return this.bookService.create(book);
  }

  @Put(':id')
  upsertBook(@Param() id, @Body() book: any): Promise<any> {
    return this.bookService.update(id.id, book);
  }

  @Delete(':id')
  deleteBook(@Param() id): Promise<any> {
    return this.bookService.delete(id.id);
  }
}
