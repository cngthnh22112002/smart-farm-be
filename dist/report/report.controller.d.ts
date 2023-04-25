import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    getAvgTempForPastWeek(req: any, report: ReportDto): Promise<any>;
    getAvgTempForPastYear(req: any, report: ReportDto): Promise<any>;
}
