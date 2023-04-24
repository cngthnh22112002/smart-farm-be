import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { AuthGuard } from '@nestjs/passport';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';

@Controller('sensors')
export class SensorsController {
    constructor(private sensorService: SensorsService) {}

    @UseGuards(AuthGuard())
    @Get('today')
    async getTodayTemp(@Request() req:any, @Query() gardenId : GardenIdDto) {
        return this.sensorService.getTodayTemperature(req.user, gardenId);
    }
}
