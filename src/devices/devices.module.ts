import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Waterpump, WaterpumpSchema } from './schema/waterpump.schema';
import { Fan, FanSchema } from './schema/fan.schema';
import { Led, LedSchema } from './schema/led.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Garden, GardenSchema } from 'src/garden/schema/garden.schema';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Led.name, schema: LedSchema }]),
    MongooseModule.forFeature([{ name: Fan.name, schema: FanSchema }]),
    MongooseModule.forFeature([{ name: Waterpump.name, schema: WaterpumpSchema }]),
    MongooseModule.forFeature([{ name: Garden.name, schema: GardenSchema }]),
  ],
  providers: [DevicesService],
  controllers: [DevicesController],
  exports: [DevicesService]

})
export class DevicesModule {}
