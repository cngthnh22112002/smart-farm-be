import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { DevicesService } from 'src/devices/devices.service';
import { AllIdDto } from './dto/allId.dto';

@Injectable()
export class ShareService {
    private gardenId: Types.ObjectId;
    private ledId: Types.ObjectId;
    private fanId: Types.ObjectId;
    private pumpId: Types.ObjectId;

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

    public setId(allId: AllIdDto): void {
       this.gardenId = allId.gardenId;
       this.ledId = allId.ledId;
       this.fanId = allId.fanId;
       this.pumpId = allId.pumpId;
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
