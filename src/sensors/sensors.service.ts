import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
import { Temperature } from './schema/temperature.schema';
import { Light } from './schema/light.schema';
import { Humidity } from './schema/humidity.schema';
import { Soilmoisture } from './schema/soilmoisture.schema';
import { CreateHumirDto } from './dto/create-humi.dto';
import { CreateLightrDto } from './dto/create-light.dto';
import { CreateSmrDto } from './dto/create-sm.dto';
import { CreateTemprDto } from './dto/create-temp.dto';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { GardenService } from 'src/garden/garden.service';
import { ReportDto } from 'src/report/dto/report.dto';

@Injectable()
export class SensorsService {
    constructor(
        private gardenService: GardenService,

        @InjectModel(Humidity.name)
        private humidityModel: mongoose.Model<Humidity>,

        @InjectModel(Light.name)
        private lightModel: mongoose.Model<Light>,

        @InjectModel(Soilmoisture.name)
        private soilmoistureModel: mongoose.Model<Soilmoisture>,

        @InjectModel(Temperature.name)
        private temperatureModel: mongoose.Model<Temperature>,

    ) {}    

    async createHumi(user: User, createHumi: CreateHumirDto): Promise <Humidity> {
        const gardenId = createHumi.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const humi = await this.humidityModel.create(createHumi);
        return humi.save();

    }

    async createLight(user: User, createLight: CreateLightrDto): Promise <Light> {
        const gardenId = createLight.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const light = await this.lightModel.create(createLight);
        return light.save();

    }

    async createSm(user: User, createSm: CreateSmrDto): Promise <Soilmoisture> {
        const gardenId = createSm.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const sm = await this.soilmoistureModel.create(createSm);
        return sm.save();

    }

    async createTemp(user: User, createTemp: CreateTemprDto): Promise <Temperature> {
        const gardenId = createTemp.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const temp = await this.temperatureModel.create(createTemp);
        return temp.save();
    }

    async getTodayReport(user: User, report: ReportDto): Promise<any> {

      const garden = this.gardenService.getOneGarden(user, {gardenId: report.gardenId});
      const type = report.type;

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

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0); // set the time to 00:00:00.000
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999); // set the time to 23:59:59.999

      
      const todayReport = await model.aggregate([
        {
          $match: {
            gardenId: (await garden)._id,
            createdAt: { $gte: startOfToday, $lte: endOfToday },
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
            _id: 0,
            value: 1,
            createdAt: 1,
          },
        },
      ]);

      return todayReport;
    }

}
