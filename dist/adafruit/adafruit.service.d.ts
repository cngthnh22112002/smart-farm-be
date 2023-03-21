import { ClientProxy } from '@nestjs/microservices';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import * as mqtt from 'mqtt';
export declare class AdafruitService {
    private socketService;
    constructor(socketService: SocketGatewayService);
    private client;
    private clientProxy;
    private host;
    private ada_port;
    private clientId;
    private feed;
    private connectUrl;
    private option;
    getClient(): mqtt.Client;
    getClientProxy(): ClientProxy;
    subscribe(topic: string): void;
    connect(): void;
}
