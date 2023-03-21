import { BridgeService } from './bridge.service';
export declare class BridgeController {
    private bridgeService;
    constructor(bridgeService: BridgeService);
    connect(): void;
    subcribe(topic: string): void;
}
