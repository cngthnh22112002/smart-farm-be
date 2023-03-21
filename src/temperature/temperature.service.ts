import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Temperature } from './schema/temperature.schema';
import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TemperatureService {
    constructor(
        @InjectModel(Temperature.name)
        private temperatureModel: mongoose.Model<Temperature>,
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async findAll(): Promise<Temperature[]> {
        const temperatures = await this.temperatureModel.find();
        return temperatures;
    }

    async createTemperature(temperature: Temperature, user: User): Promise<Temperature> {
        const data = Object.assign(temperature, {user: user._id})

        const res = await this.temperatureModel.findOne({user: temperature.user})
        if(res) {
            res.temperature.push(temperature.temperature[0]);
            await res.save();
            return res;
        }
        
        const newTemp = await this.temperatureModel.create(data);
        return newTemp;
    }


}
