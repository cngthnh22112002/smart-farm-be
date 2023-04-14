import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bridge')
export class BridgeController {
    constructor(private bridgeService: BridgeService) {}

    @Get()
    connect () {
        this.bridgeService.connect()
    }

    @Post('subscribe')
    subcribe(@Body('topic') topic: string) {
        this.bridgeService.subcribe(topic);
    }
}
