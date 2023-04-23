import { Garden } from './schema/garden.schema';
import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
import { UpdateGardenDto } from './dto/update-garden.dto';
import { CreateGardenDto } from './dto/create-garden.dto';
import { DevicesService } from 'src/devices/devices.service';
export declare class GardenService {
    private deviceService;
    private gardenModel;
    constructor(deviceService: DevicesService, gardenModel: mongoose.Model<Garden>);
    createBlankGarden(user: User): Promise<User>;
    createNewGarden(user: User, createGarden: CreateGardenDto): Promise<User>;
    updateGarden(user: User, updateGarden: UpdateGardenDto): Promise<Garden>;
    getOneGarden(user: User, gardenId: string): Promise<Garden>;
    getAllGarden(user: User): Promise<Garden[]>;
    deleteAllGarden(user: User): Promise<User>;
    deleteOneGarden(user: User, gardenId: string): Promise<User>;
}
