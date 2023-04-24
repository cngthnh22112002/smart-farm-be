import { Body, Controller, Get, Param, Post,Query,Request, UseGuards } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AuthGuard } from '@nestjs/passport';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { AllIdDto } from 'src/share/dto/allId.dto';

@Controller('bridge')
export class BridgeController {
    constructor(
        private bridgeService: BridgeService,
    ) {}
    

    @UseGuards(AuthGuard())
    @Get()
    async handleData (@Request() req: any, @Query() gardenId: GardenIdDto) {
        await this.bridgeService.handleData(req.user, gardenId);
    }

    @Post()
    async connectDevices(@Request() req:any, @Body() allId: AllIdDto) {
        await this.bridgeService.connectDevice(req.user, allId);
    }
}
