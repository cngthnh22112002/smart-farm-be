<<<<<<< Updated upstream
import { Body, Controller, Get, Post } from '@nestjs/common';
=======
import { Body, Controller, Get, Param, Post,Request, UseGuards } from '@nestjs/common';
>>>>>>> Stashed changes
import { BridgeService } from './bridge.service';

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
