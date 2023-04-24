import { DevicesService } from './devices.service';
import { Led } from './schema/led.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Fan } from './schema/fan.schema';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
export declare class DevicesController {
    private readonly deviceService;
    constructor(deviceService: DevicesService);
    createLed(req: any, gardenId: GardenIdDto): Promise<Led>;
    createFan(req: any, gardenId: GardenIdDto): Promise<Fan>;
    createPump(req: any, gardenId: GardenIdDto): Promise<Waterpump>;
}
