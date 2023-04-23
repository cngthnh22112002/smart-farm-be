import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { User } from 'src/user/schema/user.schema';
import { SensorsService } from 'src/sensors/sensors.service';
export declare class AdafruitService {
    private socketService;
    private sensorsService;
    constructor(socketService: SocketGatewayService, sensorsService: SensorsService);
    private feed;
    private led;
    private fan;
    private pump;
    subscribe(client: any, topic: string): void;
    public(client: any, topic: string, message: string): void;
    handleData(client: any, user: User, gardenId: string): void;
}
