import { DevicesService } from './devices.service';
import { Led } from './schema/led.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Fan } from './schema/fan.schema';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { LedIdDto } from './dto/ledId.dto';
import { FanIdDto } from './dto/fanId.dto';
import { PumpIdDto } from './dto/pumpId.dto';
export declare class DevicesController {
    private readonly deviceService;
    constructor(deviceService: DevicesService);
    createLed(req: any, gardenId: GardenIdDto): Promise<Led>;
    createFan(req: any, gardenId: GardenIdDto): Promise<Fan>;
    getLed(req: any, deviceId: LedIdDto): Promise<Led>;
    getFan(req: any, deviceId: FanIdDto): Promise<Fan>;
    getPump(req: any, deviceId: PumpIdDto): Promise<Waterpump>;
}
