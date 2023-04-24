import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from '@nestjs/passport';
import { Led } from './schema/led.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Fan } from './schema/fan.schema';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';

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
    async createPump(@Request() req: any, @Body() gardenId: GardenIdDto): Promise<Waterpump> {
        return this.deviceService.createPump(req.user, gardenId);
    }
}
