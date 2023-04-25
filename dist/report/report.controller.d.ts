import { ReportService } from './report.service';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    avgDayTemp(): Promise<any>;
}
