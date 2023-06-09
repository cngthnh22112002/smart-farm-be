import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HandleNotificationDto } from './dto/handle-notification.dto';
import { MessageBody } from '@nestjs/websockets';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@Injectable()
export class SocketGatewayService {

  @WebSocketServer() server: Server;

  handleConnection(client: Socket): void {
    console.log(`Client ${client.id} connected`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client ${client.id} disconnected`);
  }


  @SubscribeMessage('notification')
  handleNotification(client: any, @MessageBody() data: any): void { 
    this.server.emit('notification', "ok");
  }

  @SubscribeMessage('operator')
  handleOperator(client: any, payload: any): void { 
    this.server.emit('message', 'Hello from the server!');
  }
}
