import { AVGDay } from './schema/day/avg-day.schema';
import { AVGMonth } from './schema/month/avg-month.schema';
import mongoose from 'mongoose';
import { Temperature } from 'src/sensors/schema/temperature.schema';
import { Humidity } from 'src/sensors/schema/humidity.schema';
import { Soilmoisture } from 'src/sensors/schema/soilmoisture.schema';
import { Light } from 'src/sensors/schema/light.schema';
export declare class ReportService {
    private avgdayModel;
    private avgmonthModel;
    private humidityModel;
    private lightModel;
    private soilmoistureModel;
    private temperatureModel;
    constructor(avgdayModel: mongoose.Model<AVGDay>, avgmonthModel: mongoose.Model<AVGMonth>, humidityModel: mongoose.Model<Humidity>, lightModel: mongoose.Model<Light>, soilmoistureModel: mongoose.Model<Soilmoisture>, temperatureModel: mongoose.Model<Temperature>);
    calculateAverageByDay(type: string): Promise<void>;
}
