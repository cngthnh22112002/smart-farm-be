import { BridgeService } from './bridge.service';
export declare class BridgeController {
    private bridgeService;
    constructor(bridgeService: BridgeService);
    handleData(req: any, gardenId: string): Promise<void>;
    subcribe(topic: string): void;
}
