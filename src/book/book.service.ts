import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interfaces/book.interface';
import { IID } from './interfaces/id.interface';
import { BookDocument } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[] | null> {
    // throw new Error('err mess');
    // throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return await this.bookModel.find().exec();
  }

  async create(book: Book): Promise<Book | null> {
    const { title, description, authors, favorite, fileCover, fileName } = book;
    return await this.bookModel.create({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
  }

  async upsert(id: IID, book: Book): Promise<Book | null> {
    const { title, description, authors, favorite, fileCover, fileName } = book;
    await this.bookModel.findOneAndUpdate(
      { _id: id.id },
      {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
      },
      { upsert: true },
    );
    return book;
  }

  async delete(id: IID): Promise<Book | null> {
    return await this.bookModel.findByIdAndDelete({ _id: id.id });
  }
}
