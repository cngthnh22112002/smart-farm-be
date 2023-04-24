import { Body, Controller, Get, Param, Post,Query,Request, UseGuards } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { AuthGuard } from '@nestjs/passport';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';

@Controller('bridge')
export class BridgeController {
    constructor(
        private bridgeService: BridgeService,
    ) {}
    

    @UseGuards(AuthGuard())
    @Get()
    async handleData (@Request() req: any, @Query() gardenId: GardenIdDto) {
        this.bridgeService.handleData(req.user, gardenId);
    }

    @Post()
    subcribe(@Body('topic') topic: string) {
        //this.bridgeService.subcribe(topic);
    }
}
