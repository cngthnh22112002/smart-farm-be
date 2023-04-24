import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MqttService } from 'src/adafruit/adafruit_config';
import * as mqtt from 'mqtt';
import { BridgeService } from 'src/bridge/bridge.service';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@Injectable()
export class SocketGatewayService {
  constructor(
    private mqttService: MqttService
  ) {}

  @WebSocketServer() server: Server;

  private client = this.mqttService.getClient();


  private feed = process.env.ADA_USERNAME + "/feeds/";

  public publish(topic: string, message: string): void {
    this.client.publish(this.feed + topic, message, (err: any) => {
        if (err) {
            console.error('failed to publish message:', err);
        }
    });
  }

  public setClient(client : any): void {
    console.log("Set client success !");
    this.client = client;
  }

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
    this.publish('iot-control.led', payload.toString())
  }

  @SubscribeMessage('fan')
  handleFan(client: any, payload: any) { 
    this.publish('iot-control.fan', payload.toString())
  }

  @SubscribeMessage('pump')
  handleWaterPump(client: any, payload: any) { 
    this.publish('iot-control.pump', payload.toString())
  }
}
