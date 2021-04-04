import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookComment } from './interfaces/book.comment.interface';
import { BookCommentDocument } from './schemas/book.comment.schema';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel('BookComment')
    private bookCommentModel: Model<BookCommentDocument>,
  ) {}

  async findAllBookComment(bId: string): Promise<BookComment[] | null> {
    return await this.bookCommentModel.find({ bookId: bId }).exec();
  }

  async create(comm: BookComment): Promise<BookComment | null> {
    const { bookId, comment } = comm;
    return await this.bookCommentModel.create({
      bookId,
      comment,
    });
  }

  async read(id: string): Promise<BookComment | null> {
    return await this.bookCommentModel.findById({ _id: id });
  }

  async upsert(i: string, comm: BookComment): Promise<BookComment | null> {
    const { bookId, comment } = comm;
    return await this.bookCommentModel.findOneAndUpdate(
      { _id: i },
      {
        bookId,
        comment,
      },
      { upsert: true },
    );
  }

  async delete(id: string): Promise<BookComment | null> {
    return await this.bookCommentModel.findOneAndDelete({ _id: id });
  }
}
