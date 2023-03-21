import { Injectable } from '@nestjs/common';
import { AdafruitService } from 'src/adafruit/adafruit.service';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';

@Injectable()
export class BridgeService {
    constructor(
        private adafruitService: AdafruitService,
        private socketService: SocketGatewayService 
    ) {}

    connect(): void {
        this.adafruitService.connect();
    }

    subcribe(topic: string): void {
        this.adafruitService.subscribe(topic);
    }
}
