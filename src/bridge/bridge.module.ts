import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AdafruitModule } from 'src/adafruit/adafruit.module';
import { BridgeController } from './bridge.controller';
<<<<<<< Updated upstream

@Module({
  imports:[AdafruitModule, SocketGatewayModule],
  providers: [BridgeService],
=======
import { AuthModule } from 'src/auth/auth.module';
import { MqttService } from 'src/adafruit/adafruit_config';

@Module({
  imports:[
    AuthModule,
    AdafruitModule
  ],
  providers: [MqttService,BridgeService],
>>>>>>> Stashed changes
  controllers: [BridgeController],
})
export class BridgeModule {}
