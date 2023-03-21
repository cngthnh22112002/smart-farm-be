import { Body, Controller, Get, Post } from '@nestjs/common';
import { BridgeService } from './bridge.service';

@Controller('bridge')
export class BridgeController {
    constructor(private bridgeService: BridgeService) {}

    @Get()
    connect () {
        this.bridgeService.connect()
    }

    @Post()
    subcribe(@Body('topic') topic: string) {
        this.bridgeService.subcribe(topic);
    }
}
