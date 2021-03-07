import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [BooksModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
