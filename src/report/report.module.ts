import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { AuthModule } from 'src/auth/auth.module';
import { AVGDay, AVGDaySchema } from './schema/day/avg-day.schema';
import { AVGMonth, AVGMonthSchema } from './schema/month/avg-month.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Humidity, HumiditySchema } from 'src/sensors/schema/humidity.schema';
import { Light, LightSchema } from 'src/sensors/schema/light.schema';
import { Soilmoisture, SoilmoistureSchema } from 'src/sensors/schema/soilmoisture.schema';
import { Temperature, TemperatureSchema } from 'src/sensors/schema/temperature.schema';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{ name: AVGDay.name, schema: AVGDaySchema }]),
    MongooseModule.forFeature([{ name: AVGMonth.name, schema: AVGMonthSchema }]),
    MongooseModule.forFeature([{ name: Humidity.name, schema: HumiditySchema }]),
    MongooseModule.forFeature([{ name: Light.name, schema: LightSchema }]),
    MongooseModule.forFeature([{ name: Soilmoisture.name, schema: SoilmoistureSchema }]),
    MongooseModule.forFeature([{ name: Temperature.name, schema: TemperatureSchema }]),
  ],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
