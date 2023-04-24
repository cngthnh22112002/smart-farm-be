import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
import { Fan } from './schema/fan.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Garden } from 'src/garden/schema/garden.schema';
import { UpdateLedrDto } from './dto/update-led.dto';
import { UpdateFanrDto } from './dto/update-fan.dto';
import { UpdatePumprDto } from './dto/update-pump.dto';
import { Led } from './schema/led.schema';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
export declare class DevicesService {
    private ledModel;
    private fanModel;
    private waterpumpModel;
    private gardenModel;
    constructor(ledModel: mongoose.Model<Led>, fanModel: mongoose.Model<Fan>, waterpumpModel: mongoose.Model<Waterpump>, gardenModel: mongoose.Model<Garden>);
    createLed(user: User, garden_id: GardenIdDto): Promise<Led>;
    createFan(user: User, garden_id: GardenIdDto): Promise<Fan>;
    createPump(user: User, garden_id: GardenIdDto): Promise<Waterpump>;
    updateLed(user: User, updateLed: UpdateLedrDto): Promise<Led>;
    updateFan(user: User, updateFan: UpdateFanrDto): Promise<Fan>;
    updatePump(user: User, updatePump: UpdatePumprDto): Promise<Waterpump>;
    deleteAllDeviceForAGarden(user: User, gardenId: mongoose.Types.ObjectId): Promise<Garden>;
    deleteAllDevice(user: User): Promise<User>;
}
