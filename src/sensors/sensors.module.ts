import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Garden, GardenSchema } from 'src/garden/schema/garden.schema';
import { Humidity, HumiditySchema } from './schema/humidity.schema';
import { Light, LightSchema } from './schema/light.schema';
import { Soilmoisture, SoilmoistureSchema } from './schema/soilmoisture.schema';
import { Temperature, TemperatureSchema } from './schema/temperature.schema';
import { SensorsController } from './sensors.controller';
import { GardenModule } from 'src/garden/garden.module';

@Module({
    imports: [
      AuthModule,
      GardenModule,
      MongooseModule.forFeature([{ name: Garden.name, schema: GardenSchema }]),
      MongooseModule.forFeature([{ name: Humidity.name, schema: HumiditySchema }]),
      MongooseModule.forFeature([{ name: Light.name, schema: LightSchema }]),
      MongooseModule.forFeature([{ name: Soilmoisture.name, schema: SoilmoistureSchema }]),
      MongooseModule.forFeature([{ name: Temperature.name, schema: TemperatureSchema }]),
    ],
    providers: [SensorsService],
    exports: [SensorsService],
    controllers: [SensorsController]
  })
export class SensorsModule {}
