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
export declare class SensorsService {
    private gardenService;
    private humidityModel;
    private lightModel;
    private soilmoistureModel;
    private temperatureModel;
    constructor(gardenService: GardenService, humidityModel: mongoose.Model<Humidity>, lightModel: mongoose.Model<Light>, soilmoistureModel: mongoose.Model<Soilmoisture>, temperatureModel: mongoose.Model<Temperature>);
    createHumi(user: User, createHumi: CreateHumirDto): Promise<Humidity>;
    createLight(user: User, createLight: CreateLightrDto): Promise<Light>;
    createSm(user: User, createSm: CreateSmrDto): Promise<Soilmoisture>;
    createTemp(user: User, createTemp: CreateTemprDto): Promise<Temperature>;
    getTodayTemperature(user: User, gardenId: GardenIdDto): Promise<Temperature[]>;
    getTodayLight(user: User, gardenId: GardenIdDto): Promise<Temperature[]>;
    getTodayHumi(user: User, gardenId: GardenIdDto): Promise<Temperature[]>;
    getTodaySm(user: User, gardenId: GardenIdDto): Promise<Temperature[]>;
}
