import { AdafruitService } from 'src/adafruit/adafruit.service';
import { MqttService } from 'src/adafruit/adafruit_config';
import { DevicesService } from 'src/devices/devices.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { AllIdDto } from 'src/share/dto/allId.dto';
import { ShareService } from 'src/share/share.service';
import { User } from 'src/user/schema/user.schema';
export declare class BridgeService {
    private adafruitService;
    private mqttService;
    private shareService;
    private deviceService;
    constructor(adafruitService: AdafruitService, mqttService: MqttService, shareService: ShareService, deviceService: DevicesService);
    handleData(user: User, gardenId: GardenIdDto): Promise<void>;
    connectDevice(user: User, allId: AllIdDto): Promise<void>;
    connect(user: User): void;
    disconnect(user: User): void;
}
