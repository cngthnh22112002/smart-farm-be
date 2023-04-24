import { GardenService } from './garden.service';
import { User } from 'src/user/schema/user.schema';
import { Garden } from './schema/garden.schema';
import { UpdateGardenDto } from './dto/update-garden.dto';
import { CreateGardenDto } from './dto/create-garden.dto';
import { GardenIdDto } from './dto/gardenId.dto';
export declare class GardenController {
    private readonly gardenService;
    constructor(gardenService: GardenService);
    getAllGarden(req: any): Promise<Garden[]>;
    getOneGarden(req: any, gardenId: GardenIdDto): Promise<Garden>;
    createBlankNewGarden(req: any): Promise<User>;
    createNewGarden(req: any, newGarden: CreateGardenDto): Promise<User>;
    updateGarden(req: any, updateGarden: UpdateGardenDto): Promise<Garden>;
    deleteAllGarden(req: any): Promise<User>;
    deleteOneGarden(req: any, gardenId: GardenIdDto): Promise<User>;
}
