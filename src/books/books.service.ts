import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  create(book: Book) {
    const { title, description, authors, favorite, fileCover, fileName } = book;
    this.books.push({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }
}
