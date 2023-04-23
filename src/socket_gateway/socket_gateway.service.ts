import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@Injectable()
export class SocketGatewayService {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);
    this.server.emit('message', 'Hello, client!');
  }


  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }


  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('notification')
  async handleNotification(client: any, payload: any) { 
    this.server.emit('notification', "ok");
  }

  @SubscribeMessage('operator')
  handleOperator(client: any, payload: any): void { 
    this.server.emit('message', 'Hello from the server!');
  }


  @SubscribeMessage('led')
  handleLed(client: any, payload: any): void { 
    
  }

  @SubscribeMessage('fan')
  handleFan(client: any, payload: any) { 
    
  }

  @SubscribeMessage('pump')
  handleWaterPump(client: any, payload: any) { 
    
  }
}
