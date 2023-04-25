import { Injectable } from '@nestjs/common';
import { AVGDay } from './schema/day/avg-day.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AVGMonth } from './schema/month/avg-month.schema';
import mongoose from 'mongoose';
import * as schedule from 'node-schedule';
import { Aggregate } from 'mongoose';
import { Temperature } from 'src/sensors/schema/temperature.schema';
import { Humidity } from 'src/sensors/schema/humidity.schema';
import { Soilmoisture } from 'src/sensors/schema/soilmoisture.schema';
import { Light } from 'src/sensors/schema/light.schema';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(AVGDay.name)
        private avgdayModel: mongoose.Model<AVGDay>,

        @InjectModel(AVGMonth.name)
        private avgmonthModel: mongoose.Model<AVGMonth>,

        @InjectModel(Humidity.name)
        private humidityModel: mongoose.Model<Humidity>,

        @InjectModel(Light.name)
        private lightModel: mongoose.Model<Light>,

        @InjectModel(Soilmoisture.name)
        private soilmoistureModel: mongoose.Model<Soilmoisture>,

        @InjectModel(Temperature.name)
        private temperatureModel: mongoose.Model<Temperature>,

    ) {}

    async calculateAverageByDay( type:string ): Promise<void> {
        let model: mongoose.Model<Temperature | Humidity | Soilmoisture | Light>;
        if (type === 'temperature') {
            model = this.temperatureModel;
        } else if (type === 'humidity') {
            model = this.humidityModel;
        } else if (type === 'soilmoisture') {
            model = this.soilmoistureModel;
        } else if (type === 'light') {
            model = this.lightModel;     
        } else {
            throw new Error('Invalid type parameter');
        }

        const pipeline: any[] = [
            {
              $group: {
                _id: {
                  gardenId: "$gardenId",
                  date: {
                    $dateFromParts: {
                      year: { $year: "$createdAt" },
                      month: { $month: "$createdAt" },
                      day: { $dayOfMonth: "$createdAt" }
                    }
                  }
                },
                total: { $sum: "$value" },
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                gardenId: "$_id.gardenId",
                year: { $year: "$_id.date" },
                month: { $month: "$_id.date" },
                day: { $dayOfMonth: "$_id.date" },
                average: { $divide: ["$total", "$count"] }
              }
            },
            {
              $sort: {
                gardenId: 1,
                year: 1,
                month: 1,
                day: 1
              }
            },
            {
              $addFields: {
                createdAt: {
                  $dateFromString: {
                    dateString: {
                      $concat: [
                        { $toString: "$year" },
                        "-",
                        { $toString: "$month" },
                        "-",
                        { $toString: "$day" }
                      ]
                    },
                    format: "%Y-%m-%d"
                  }
                }
              }
            }
          ];
          
   
        const result = await model.aggregate(pipeline).exec();
      
        for (const r of result) {
          const { gardenId, year, month, day, average } = r;
          const date = new Date(year, month - 1, day); // subtract 1 from month to create valid Date object
          const avg = new this.avgdayModel({ gardenId, type, average, createdAt: date });
          await avg.save();
        }
    }
}
