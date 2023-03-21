import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { Temperature } from './schema/temperature.schema';
import { TemperatureService } from './temperature.service';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('temperature')
export class TemperatureController {
    constructor(private temperatureService: TemperatureService) {}

    @Get()
    async getAllTemperatures(): Promise<Temperature[]> {
        return this.temperatureService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard())
    async createTemperature(
        @Body()
        temperature: CreateTemperatureDto,
        @Req() req
    ): Promise<Temperature> {
        console.log(req.user)
        const createTemp = await this.temperatureService.createTemperature(temperature,req.user);
        if(!createTemp) {
            throw new NotFoundException(`Record not found`);
        } 
        return createTemp;
    }

}
