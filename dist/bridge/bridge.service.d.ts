import { AdafruitService } from 'src/adafruit/adafruit.service';
import { MqttService } from 'src/adafruit/adafruit_config';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { User } from 'src/user/schema/user.schema';
export declare class BridgeService {
    private adafruitService;
    private mqttService;
    constructor(adafruitService: AdafruitService, mqttService: MqttService);
    handleData(user: User, gardenId: GardenIdDto): Promise<void>;
}
