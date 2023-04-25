export declare class ShareService {
    private ledStatus;
    private fanStatus;
    private pumpStatus;
    getLedStatus(): string;
    getFanStatus(): string;
    getPumpStatus(): string;
    setLedStatus(status: string): void;
    setFanStatus(status: string): void;
    setPumpStatus(status: string): void;
}
