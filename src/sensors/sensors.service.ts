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

@Injectable()
export class SensorsService {
    constructor(
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
        return humi;

    }

    async createLight(user: User, createLight: CreateLightrDto): Promise <Light> {
        const gardenId = createLight.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const light = await this.lightModel.create(createLight);
        return light;

    }

    async createSm(user: User, createSm: CreateSmrDto): Promise <Soilmoisture> {
        const gardenId = createSm.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const sm = await this.soilmoistureModel.create(createSm);
        return sm;

    }

    async createTemp(user: User, createTemp: CreateTemprDto): Promise <Temperature> {
        const gardenId = createTemp.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  
        const temp = await this.temperatureModel.create(createTemp);
        return temp;
    }

}
