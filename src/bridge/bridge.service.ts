import { Injectable } from '@nestjs/common';
import { AdafruitService } from 'src/adafruit/adafruit.service';
import { MqttService } from 'src/adafruit/adafruit_config';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class BridgeService {
    constructor(
        private adafruitService: AdafruitService,
        private mqttService: MqttService
    ) {
        this.mqttService.init();
    }

    handleData(user: User, gardenId: string): void {
        const client = this.mqttService.getClient();
        this.adafruitService.handleData(client, user, gardenId);
    }
}
