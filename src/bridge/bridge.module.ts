import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AdafruitModule } from 'src/adafruit/adafruit.module';
import { BridgeController } from './bridge.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MqttService } from 'src/adafruit/adafruit_config';
import { ShareService } from 'src/share/share.service';
import { DevicesService } from 'src/devices/devices.service';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports:[
    AuthModule,
    AdafruitModule,
    DevicesModule
  ],
  providers: [MqttService,BridgeService,ShareService],
  controllers: [BridgeController],
  exports: [BridgeService]
})
export class BridgeModule {}
