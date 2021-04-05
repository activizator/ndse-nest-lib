import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentSchema } from '../book.comment/schemas/book.comment.schema';
import { BookCommentService } from '../book.comment/book.comment.service';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BookComment', schema: BookCommentSchema },
    ]),
  ],
  providers: [EventsGateway, BookCommentService],
})
export class WsBookCommentModule {}
