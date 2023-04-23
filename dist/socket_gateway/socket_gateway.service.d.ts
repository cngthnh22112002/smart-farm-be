import { Server, Socket } from 'socket.io';
export declare class SocketGatewayService {
    server: Server;
    handleConnection(client: Socket): void;
    handleMessage(client: Socket, payload: any): string;
    handleDisconnect(client: Socket): void;
    handleNotification(client: any, payload: any): Promise<void>;
    handleOperator(client: any, payload: any): void;
    handleLed(client: any, payload: any): void;
    handleFan(client: any, payload: any): void;
    handleWaterPump(client: any, payload: any): void;
}
