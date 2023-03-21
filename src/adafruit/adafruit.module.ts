import { Module } from '@nestjs/common';
import { AdafruitService } from './adafruit.service';
import { SocketGatewayModule } from 'src/socket_gateway/socket_gateway.module';

@Module({
    imports: [SocketGatewayModule],
    providers: [AdafruitService],
    exports:[AdafruitService]
})
export class AdafruitModule {}
