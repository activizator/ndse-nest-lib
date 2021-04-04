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
    return await this.bookCommentModel.find({ bookId: bId });
  }

  async create(comm: BookComment): Promise<BookComment | null> {
    const { id, bookId, comment } = comm;
    return await this.bookCommentModel.create({
      id,
      bookId,
      comment,
    });
  }

  async read(i: number): Promise<BookComment | null> {
    return await this.bookCommentModel.findOne({ id: i });
  }

  async upsert(i: number, comm: BookComment): Promise<BookComment | null> {
    const { id, bookId, comment } = comm;
    return await this.bookCommentModel.findOneAndUpdate(
      { id: i },
      {
        id,
        bookId,
        comment,
      },
      { upsert: true },
    );
  }

  async delete(i: number): Promise<BookComment | null> {
    return await this.bookCommentModel.findOneAndDelete({ id: i });
  }
}
