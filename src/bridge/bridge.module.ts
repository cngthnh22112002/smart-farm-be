import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AdafruitModule } from 'src/adafruit/adafruit.module';
import { SocketGatewayModule } from 'src/socket_gateway/socket_gateway.module';
import { BridgeController } from './bridge.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    AdafruitModule, 
    SocketGatewayModule
  ],
  providers: [BridgeService],
  controllers: [BridgeController],
})
export class BridgeModule {}
