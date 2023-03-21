import { Temperature } from './schema/temperature.schema';
import { TemperatureService } from './temperature.service';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
export declare class TemperatureController {
    private temperatureService;
    constructor(temperatureService: TemperatureService);
    getAllTemperatures(): Promise<Temperature[]>;
    createTemperature(temperature: CreateTemperatureDto, req: any): Promise<Temperature>;
}
