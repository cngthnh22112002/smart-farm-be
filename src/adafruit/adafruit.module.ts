import { Module } from '@nestjs/common';
import { AdafruitService } from './adafruit.service';
import { SensorsModule } from 'src/sensors/sensors.module';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { MqttService } from './adafruit_config';
import { DevicesModule } from 'src/devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Led, LedSchema } from 'src/devices/schema/led.schema';
import { Fan, FanSchema } from 'src/devices/schema/fan.schema';
import { Waterpump, WaterpumpSchema } from 'src/devices/schema/waterpump.schema';
import { Garden, GardenSchema } from 'src/garden/schema/garden.schema';
import { ShareService } from 'src/share/share.service';

@Module({
    imports: [
        SensorsModule,
        DevicesModule,
        MongooseModule.forFeature([{ name: Led.name, schema: LedSchema }]),
        MongooseModule.forFeature([{ name: Fan.name, schema: FanSchema }]),
        MongooseModule.forFeature([{ name: Waterpump.name, schema: WaterpumpSchema }]),
        MongooseModule.forFeature([{ name: Garden.name, schema: GardenSchema }]),
    ],
    providers: [MqttService, ShareService, AdafruitService, SocketGatewayService,],
    exports:[AdafruitService]
})
export class AdafruitModule {}
