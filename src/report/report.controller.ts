import { Controller, Get, Request } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) {}

    @Get('avgday/temperature')
    async avgDayTemp (): Promise<any> {
        return await this.reportService.calculateAverageByDay('temperature');
    }


}
