// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { BookCommentService } from 'src/book.comment/book.comment.service';
// import { BookComment } from 'src/book.comment/interfaces/book.comment.interface';

// @WebSocketGateway()
// export class EventsGateway {
//   constructor(private readonly bookCommentService: BookCommentService) {}

//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('events')
//   getAllComments(@MessageBody() bookId): Promise<BookComment[]> {
//     return this.bookCommentService.findAllBookComment(bookId.bookId);
//   }

//   @SubscribeMessage('identity')
//   async identity(@MessageBody() data: number): Promise<number> {
//     return data;
//   }
// }

// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsResponse,
// } from '@nestjs/websockets';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Server } from 'socket.io';

// @WebSocketGateway()
// export class EventsGateway {
//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('events')
//   findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
//     return from([1, 2, 3]).pipe(
//       map((item) => ({ event: 'events', data: item })),
//     );
//   }

//   @SubscribeMessage('identity')
//   async identity(@MessageBody() data: number): Promise<number> {
//     return data;
//   }
// }

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
