import { GardenService } from './garden.service';
import { User } from 'src/user/schema/user.schema';
import { Garden } from './schema/garden.schema';
import { UpdateGardenDto } from './dto/update-garden.dto';
import { CreateGardenDto } from './dto/create-garden.dto';
export declare class GardenController {
    private readonly gardenService;
    constructor(gardenService: GardenService);
    getOneGarden(req: any, gardenId: string): Promise<Garden>;
    getAllGarden(req: any): Promise<Garden[]>;
    createBlankNewGarden(req: any): Promise<User>;
    createNewGarden(req: any, newGarden: CreateGardenDto): Promise<User>;
    updateGarden(req: any, updateGarden: UpdateGardenDto): Promise<Garden>;
    deleteAllGarden(req: any): Promise<User>;
    deleteOneGarden(req: any, gardenId: string): Promise<User>;
}
