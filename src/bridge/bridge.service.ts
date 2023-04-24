import { Injectable } from '@nestjs/common';
import { AdafruitService } from 'src/adafruit/adafruit.service';
import { MqttService } from 'src/adafruit/adafruit_config';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { User } from 'src/user/schema/user.schema';
import * as mqtt from 'mqtt';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';

@Injectable()
export class BridgeService {
    constructor(
        private adafruitService: AdafruitService,
        private mqttService: MqttService,
    ) {
        this.mqttService.init();
    }

    async handleData(user: User, gardenId: GardenIdDto) {
        const client = this.mqttService.getClient();
        await this.adafruitService.handleData(client, user, gardenId);
    }
}
