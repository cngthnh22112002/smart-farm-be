import { AllIdDto } from './dto/allId.dto';
export declare class ShareService {
    private gardenId;
    private ledId;
    private fanId;
    private pumpId;
    private ledStatus;
    private fanStatus;
    private pumpStatus;
    getLedStatus(): string;
    getFanStatus(): string;
    getPumpStatus(): string;
    setId(allId: AllIdDto): void;
    setLedStatus(status: string): void;
    setFanStatus(status: string): void;
    setPumpStatus(status: string): void;
}
