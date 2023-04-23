import { DevicesService } from './devices.service';
import { Led } from './schema/led.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Fan } from './schema/fan.schema';
export declare class DevicesController {
    private readonly deviceService;
    constructor(deviceService: DevicesService);
    createLed(req: any, gardenId: string): Promise<Led>;
    createFan(req: any, gardenId: string): Promise<Fan>;
    createPump(req: any, gardenId: string): Promise<Waterpump>;
}
