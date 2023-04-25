import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MqttService } from 'src/adafruit/adafruit_config';
import { ShareService } from 'src/share/share.service';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@Injectable()
export class SocketGatewayService {
  constructor(
    private mqttService: MqttService,
    private shareService: ShareService,
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



  async handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);

    var ledStatus = this.shareService.getLedStatus();
    var fanStatus = this.shareService.getFanStatus();
    var pumpStatus = this.shareService.getPumpStatus();

    this.server.emit('fan', 'cc');
    this.server.emit('pump', 'cc');
    this.server.emit('led', ledStatus);
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
      console.log(payload.toString());
      this.publish('iot-control.led', payload.toString());
  }

  @SubscribeMessage('fan')
  handleFan(client: any, payload: any) { 
      this.publish('iot-control.fan',  payload.toString());
  }

  @SubscribeMessage('pump')
  handleWaterPump(client: any, payload: any) { 
      this.publish('iot-control.pump', payload.toString());
  }
}
