import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { AuthGuard } from '@nestjs/passport';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { ReportDto } from 'src/report/dto/report.dto';

@Controller('sensors')
export class SensorsController {
    constructor(private sensorService: SensorsService) {}

    @UseGuards(AuthGuard())
    @Get('today')
    async getTodayTemp(@Request() req:any, @Query() report : ReportDto) {
        return this.sensorService.getTodayReport(req.user, report);
    }
}
