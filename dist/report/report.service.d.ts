import { AVGDay } from './schema/day/avg-day.schema';
import { AVGMonth } from './schema/month/avg-month.schema';
import mongoose from 'mongoose';
import { Temperature } from 'src/sensors/schema/temperature.schema';
import { Humidity } from 'src/sensors/schema/humidity.schema';
import { Soilmoisture } from 'src/sensors/schema/soilmoisture.schema';
import { Light } from 'src/sensors/schema/light.schema';
import { ReportDto } from './dto/report.dto';
import { GardenService } from 'src/garden/garden.service';
import { User } from 'src/user/schema/user.schema';
export declare class ReportService {
    private avgdayModel;
    private avgmonthModel;
    private humidityModel;
    private lightModel;
    private soilmoistureModel;
    private temperatureModel;
    private gardenService;
    constructor(avgdayModel: mongoose.Model<AVGDay>, avgmonthModel: mongoose.Model<AVGMonth>, humidityModel: mongoose.Model<Humidity>, lightModel: mongoose.Model<Light>, soilmoistureModel: mongoose.Model<Soilmoisture>, temperatureModel: mongoose.Model<Temperature>, gardenService: GardenService);
    calculateAverageByDay(type: string): Promise<void>;
    calculateAverageByMonth(type: string): Promise<void>;
    getAvgForPastWeek(user: User, report: ReportDto): Promise<any>;
    getAvgForPastYear(user: User, report: ReportDto): Promise<any>;
}
