import { Server, Socket } from 'socket.io';
import { MqttService } from 'src/adafruit/adafruit_config';
import { ShareService } from 'src/share/share.service';
export declare class SocketGatewayService {
    private mqttService;
    private shareService;
    constructor(mqttService: MqttService, shareService: ShareService);
    server: Server;
    private client;
    private feed;
    publish(topic: string, message: string): void;
    setClient(client: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleMessage(client: Socket, payload: any): string;
    handleDisconnect(client: Socket): void;
    handleNotification(client: any, payload: any): Promise<void>;
    handleOperator(client: any, payload: any): void;
    handleLed(client: any, payload: any): void;
    handleFan(client: any, payload: any): void;
    handleWaterPump(client: any, payload: any): void;
}
