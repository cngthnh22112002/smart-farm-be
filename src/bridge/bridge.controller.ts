import { Body, Controller, Get, Param, Post,Request, UseGuards } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bridge')
export class BridgeController {
    constructor(private bridgeService: BridgeService) {}

    @UseGuards(AuthGuard())
    @Get(':id')
    async handleData (@Request() req: any, @Param('id') gardenId: string) {
        this.bridgeService.handleData(req.user, gardenId);
    }

    @Post()
    subcribe(@Body('topic') topic: string) {
        //this.bridgeService.subcribe(topic);
    }
}
