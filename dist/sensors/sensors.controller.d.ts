import { SensorsService } from './sensors.service';
import { ReportDto } from 'src/report/dto/report.dto';
export declare class SensorsController {
    private sensorService;
    constructor(sensorService: SensorsService);
    getTodayTemp(req: any, report: ReportDto): Promise<any>;
}
