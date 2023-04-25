import { Injectable } from '@nestjs/common';

@Injectable()
export class ShareService {
    private ledStatus: string;
    private fanStatus: string;
    private pumpStatus: string;



    public getLedStatus(): string {
        return this.ledStatus;
    }

    public getFanStatus(): string {
        return this.fanStatus;
    }

    public getPumpStatus(): string {
        return this.pumpStatus;
    }

    public setLedStatus(status: string): void {
        this.ledStatus = status;
    }

    public setFanStatus(status: string): void {
        this.fanStatus = status;
    }

    public setPumpStatus(status: string): void {
        this.pumpStatus = status;
    }
}