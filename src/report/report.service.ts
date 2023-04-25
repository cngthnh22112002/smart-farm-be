import { Injectable } from '@nestjs/common';
import { AVGDay } from './schema/day/avg-day.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AVGMonth } from './schema/month/avg-month.schema';
import mongoose from 'mongoose';
import schedule from 'node-schedule';
import { Temperature } from 'src/sensors/schema/temperature.schema';
import { Humidity } from 'src/sensors/schema/humidity.schema';
import { Soilmoisture } from 'src/sensors/schema/soilmoisture.schema';
import { Light } from 'src/sensors/schema/light.schema';
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

    ) {
          // Schedule the job to run at 12:00 AM on each day
          schedule.scheduleJob('0 0 * * *', () => {
              this.calculateAverageByDay('temperature');
              this.calculateAverageByDay('humidity');
              this.calculateAverageByDay('soilmoisture');
              this.calculateAverageByDay('light');
          });

              // Schedule the job to run at 12:00 AM on the first day of every month
          schedule.scheduleJob('0 0 1 * *', () => {
            this.calculateAverageByMonth('temperature');
            this.calculateAverageByMonth('humidity');
            this.calculateAverageByMonth('soilmoisture');
            this.calculateAverageByMonth('light');
          });
    }

    async calculateAverageByDay(type: string): Promise<void> {
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
    };

    async calculateAverageByMonth(type: string): Promise<void> {
      let model: mongoose.Model<AVGDay>;
      if (type === 'temperature') {
        model = this.avgdayModel;
      } else if (type === 'humidity') {
        // add code to handle humidity
      } else if (type === 'soilmoisture') {
        // add code to handle soilmoisture
      } else if (type === 'light') {
        // add code to handle light
      } else {
        throw new Error('Invalid type parameter');
      }
    
      const pipeline: any[] = [
        {
          $match: {
            type: type
          }
        },
        {
          $group: {
            _id: {
              gardenId: "$gardenId",
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            total: { $sum: "$average" },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            gardenId: "$_id.gardenId",
            year: "$_id.year",
            month: "$_id.month",
            average: { $divide: ["$total", "$count"] }
          }
        },
        {
          $sort: {
            gardenId: 1,
            year: 1,
            month: 1
          }
        }
      ];
    
      const result = await model.aggregate(pipeline).exec();
    
      for (const r of result) {
        const { gardenId, year, month, average } = r;
        const date = new Date(year, month - 1, 1); // subtract 1 from month to create valid Date object
        const avg = new this.avgmonthModel({ gardenId, type, average, createdAt: date });
        await avg.save();
      }
    };

    async getAvgTempForPastWeek(gardenId: string, type: string): Promise<any> {
      // Calculate the date seven days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      // Query the database for the past week's data for the specified gardenId
      const query = { 
        gardenId: gardenId, 
        type: type,
        createdAt: { $gte: sevenDaysAgo }
      };
      
      const result = await this.avgdayModel.find(query).sort({ createdAt: 'asc' }).exec();
      return result;
    }

    async getAvgTempForPastYear(gardenId: string, type: string): Promise<any> {
      // Get the current year
      const currentYear = new Date().getFullYear();
    
      // Calculate the date one year ago
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentYear - 1);
    
      // Query the database for the past year's data for the specified gardenId
      const query = { 
        gardenId: gardenId, 
        type: type,
        createdAt: { $gte: oneYearAgo },
        $expr: {
          $eq: [{ $year: "$createdAt" }, currentYear]
        }
      };
      
      const result = await this.avgdayModel.find(query).sort({ createdAt: 'asc' }).exec();
      return result;
    }
}
