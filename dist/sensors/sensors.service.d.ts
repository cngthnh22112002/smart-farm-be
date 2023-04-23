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
export declare class SensorsService {
    private humidityModel;
    private lightModel;
    private soilmoistureModel;
    private temperatureModel;
    constructor(humidityModel: mongoose.Model<Humidity>, lightModel: mongoose.Model<Light>, soilmoistureModel: mongoose.Model<Soilmoisture>, temperatureModel: mongoose.Model<Temperature>);
    createHumi(user: User, createHumi: CreateHumirDto): Promise<Humidity>;
    createLight(user: User, createLight: CreateLightrDto): Promise<Light>;
    createSm(user: User, createSm: CreateSmrDto): Promise<Soilmoisture>;
    createTemp(user: User, createTemp: CreateTemprDto): Promise<Temperature>;
}
