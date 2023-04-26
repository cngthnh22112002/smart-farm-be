import { Injectable } from '@nestjs/common';
import { AVGDay } from './schema/day/avg-day.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AVGMonth } from './schema/month/avg-month.schema';
import mongoose from 'mongoose';
import { Temperature } from 'src/sensors/schema/temperature.schema';
import { Humidity } from 'src/sensors/schema/humidity.schema';
import { Soilmoisture } from 'src/sensors/schema/soilmoisture.schema';
import { Light } from 'src/sensors/schema/light.schema';
import { ReportDto } from './dto/report.dto';
import { GardenService } from 'src/garden/garden.service';
import { User } from 'src/user/schema/user.schema';
import { Cron } from '@nestjs/schedule';

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

        private gardenService: GardenService

    ) {}

     // Schedule the job to run at 12:00 AM on each day
    @Cron('0 0 * * *')
    async reportEveryDay() {
      await this.calculateAverageByDay('temperature');
      await this.calculateAverageByDay('humidity');
      await this.calculateAverageByDay('soilmoisture');
      await this.calculateAverageByDay('light');
    }

    // Schedule the job to run at 12:00 AM on the first day of every month
    @Cron('0 0 1 * *')
    async reportEveryMonth() {
      await this.calculateAverageByMonth('temperature');
      await this.calculateAverageByMonth('humidity');
      await this.calculateAverageByMonth('soilmoisture');
      await this.calculateAverageByMonth('light');
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

    async getAvgForPastWeek(user: User, report: ReportDto): Promise<any> {
      const garden = this.gardenService.getOneGarden(user, {gardenId: report.gardenId});
      const type = report.type;

      const startOfPastWeek = new Date();
      startOfPastWeek.setDate(startOfPastWeek.getDate() - 7);
      startOfPastWeek.setHours(0, 0, 0, 0); // set the time to 00:00:00.000
    
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999); // set the time to 23:59:59.999
    
      const pastWeekReports = await this.avgdayModel.aggregate([
        {
          $match: {
            gardenId: (await garden)._id,
            type: type,
            createdAt: { $gte: startOfPastWeek, $lte: endOfToday },
          },
        },
        {
          $lookup: {
            from: 'gardens',
            localField: 'gardenId',
            foreignField: '_id',
            as: 'garden',
          },
        },
        {
          $project: {
            _id: 1,
            average: 1,
            createdAt: 1,
            gardenId: 1
          },
        },
      ]);
    
      return pastWeekReports;
    }
    

    async getAvgForPastYear(user: User, report: ReportDto): Promise<any> {
      const garden = this.gardenService.getOneGarden(user, {gardenId: report.gardenId});
      const type = report.type;

      // Get the current year
      const currentYear = new Date().getFullYear();
    
      // Calculate the date one year ago
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentYear - 1);
    
      // Query the database for the past year's data for the specified gardenId
      const query = { 
        gardenId: (await garden)._id, 
        type: type,
        createdAt: { $gte: oneYearAgo },
        $expr: {
          $eq: [{ $year: "$createdAt" }, currentYear]
        }
      };
      
      const result = await this.avgmonthModel.find(query).sort({ createdAt: 'asc' }).exec();
      return result;
    }
}
