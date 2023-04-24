import { BridgeService } from './bridge.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
export declare class BridgeController {
    private bridgeService;
    constructor(bridgeService: BridgeService);
    handleData(req: any, gardenId: GardenIdDto): Promise<void>;
    subcribe(topic: string): void;
}
