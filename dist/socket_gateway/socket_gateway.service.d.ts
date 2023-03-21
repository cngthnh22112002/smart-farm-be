import { Server, Socket } from 'socket.io';
export declare class SocketGatewayService {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleNotification(client: any, data: any): void;
    handleOperator(client: any, payload: any): void;
}
