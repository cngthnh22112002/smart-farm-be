import { SensorsService } from './sensors.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
export declare class SensorsController {
    private sensorService;
    constructor(sensorService: SensorsService);
    getTodayTemp(req: any, gardenId: GardenIdDto): Promise<import("./schema/temperature.schema").Temperature[]>;
}
