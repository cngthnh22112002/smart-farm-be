import { BridgeService } from './bridge.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { AllIdDto } from 'src/share/dto/allId.dto';
export declare class BridgeController {
    private bridgeService;
    constructor(bridgeService: BridgeService);
    handleData(req: any, gardenId: GardenIdDto): Promise<void>;
    connect(req: any): Promise<void>;
    disconnect(req: any): Promise<void>;
    connectDevices(req: any, allId: AllIdDto): Promise<void>;
}
