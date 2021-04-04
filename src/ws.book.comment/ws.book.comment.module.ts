import { Module } from '@nestjs/common';
import { BookCommentService } from 'src/book.comment/book.comment.service';
import { EventsGateway } from './events.gateway';

@Module({})
export class WsBookCommentModule {
  providers: [EventsGateway, BookCommentService];
}
