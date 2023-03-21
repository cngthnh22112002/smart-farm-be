import { Temperature } from './schema/temperature.schema';
import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
export declare class TemperatureService {
    private temperatureModel;
    private userModel;
    constructor(temperatureModel: mongoose.Model<Temperature>, userModel: mongoose.Model<User>);
    findAll(): Promise<Temperature[]>;
    createTemperature(temperature: Temperature, user: User): Promise<Temperature>;
}
