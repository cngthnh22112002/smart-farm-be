import { Injectable } from '@nestjs/common';
import { privateDecrypt } from 'crypto';
import { AdafruitService } from 'src/adafruit/adafruit.service';
import { MqttService } from 'src/adafruit/adafruit_config';
import { DevicesService } from 'src/devices/devices.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { AllIdDto } from 'src/share/dto/allId.dto';
import { ShareService } from 'src/share/share.service';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class BridgeService {
    constructor(
        private adafruitService: AdafruitService,
        private mqttService: MqttService,
        private shareService: ShareService,
        private deviceService: DevicesService
    ) { 
        this.mqttService.init();
    }

    async handleData(user: User, gardenId: GardenIdDto) {
        var client = this.mqttService.getClient();
        if(!client) {
            this.mqttService.init();
            client = this.mqttService.getClient();
        }
        await this.adafruitService.handleData(client, user, gardenId);
    }

    

    async connectDevice(user: User, allId: AllIdDto) {
        this.shareService.setId(allId);
        const ledStatus = (await this.deviceService.getLed({ledId: allId.ledId})).status
        const fanStatus = (await this.deviceService.getFan({fanId: allId.fanId})).status
        const pumpStatus = (await this.deviceService.getPump({pumpId: allId.pumpId})).status

        this.shareService.setFanStatus(fanStatus);
        this.shareService.setLedStatus(ledStatus);
        this.shareService.setPumpStatus(pumpStatus);
    }

    connect(user: User) {
        this.mqttService.init();
    }

    disconnect(user: User) {
        const client = this.mqttService.getClient();
        this.adafruitService.disconnect(client);
        this.mqttService.setClient(undefined);
    }

}
