import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
export class ReportController {
    constructor(private reportService: ReportService) {}


    @UseGuards(AuthGuard())
    @Get('week')
    async getAvgTempForPastWeek (@Request() req:any, @Query() report: ReportDto): Promise<any> {
        return await this.reportService.getAvgForPastWeek(req.user , report);
    }

    @UseGuards(AuthGuard())
    @Get('month')
    async getAvgTempForPastYear (@Request() req:any, @Query() report: ReportDto): Promise<any> {
        return await this.reportService.getAvgForPastYear(req.user,report);
    }


}
