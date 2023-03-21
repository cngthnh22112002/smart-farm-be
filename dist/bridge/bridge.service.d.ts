import { AdafruitService } from 'src/adafruit/adafruit.service';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
export declare class BridgeService {
    private adafruitService;
    private socketService;
    constructor(adafruitService: AdafruitService, socketService: SocketGatewayService);
    connect(): void;
    subcribe(topic: string): void;
}
