import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { BookCommentService } from '../book.comment/book.comment.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly bookCommentService: BookCommentService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('msgToServer_getAllComments')
  async getAllComments(client: Socket, payload): Promise<void> {
    const bId: string = payload.text;
    // 60327f2507cc172f7022bcca
    const mess = await this.bookCommentService.findAllBookComment(bId);
    this.server.emit('msgToClient', JSON.stringify(mess));
  }

  @SubscribeMessage('msgToServer_addComment')
  async addComment(client: Socket, payload): Promise<void> {
    const comment = JSON.parse(payload.text);
    // {
    //   "bookId": "60327f2507cc172f7022bcca",
    //   "comment": "Комментарий 66"
    // }
    const mess = await this.bookCommentService.create(comment);
    this.server.emit('msgToClient', 'added' + JSON.stringify(mess));
  }

  afterInit(server: Server) {
    console.log('WS Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
