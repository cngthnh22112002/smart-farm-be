import { Body, Controller, Post, UseGuards, Request, Query, Get } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from '@nestjs/passport';
import { Led } from './schema/led.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Fan } from './schema/fan.schema';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { LedIdDto } from './dto/ledId.dto';
import { FanIdDto } from './dto/fanId.dto';
import { PumpIdDto } from './dto/pumpId.dto';

@Controller('devices')
export class DevicesController {
    constructor(private readonly deviceService: DevicesService) {}

    @UseGuards(AuthGuard())
    @Post('led')
    async createLed(@Request() req: any, @Body() gardenId: GardenIdDto): Promise<Led> {
        return this.deviceService.createLed(req.user, gardenId);
    } 

    @UseGuards(AuthGuard())
    @Post('fan')
    async createFan(@Request() req: any, @Body() gardenId: GardenIdDto): Promise<Fan> {
        return this.deviceService.createFan(req.user, gardenId);
    }

    @UseGuards(AuthGuard())
    @Post('pump')
    async createPump(@Request() req: any, @Body() gardenId: GardenIdDto): Promise<Fan> {
        return this.deviceService.createPump(req.user, gardenId);
    }

    @UseGuards(AuthGuard())
    @Get('led')
    async getLed(@Request() req: any, @Query() deviceId: LedIdDto): Promise<Led> {
        return this.deviceService.getLed(deviceId);
    }

    @UseGuards(AuthGuard())
    @Get('fan')
    async getFan(@Request() req: any, @Query() deviceId: FanIdDto): Promise<Fan> {
        return this.deviceService.getFan(deviceId);
    }

    @UseGuards(AuthGuard())
    @Get('pump')
    async getPump(@Request() req: any, @Query() deviceId: PumpIdDto): Promise<Waterpump> {
        return this.deviceService.getPump(deviceId);
    }
}
