import { Module } from '@nestjs/common';
import { AdafruitService } from './adafruit.service';
import { SensorsModule } from 'src/sensors/sensors.module';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { MqttService } from './adafruit_config';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
    imports: [
        SensorsModule,
        DevicesModule
    ],
    providers: [MqttService, SocketGatewayService, AdafruitService],
    exports:[AdafruitService]
})
export class AdafruitModule {}
