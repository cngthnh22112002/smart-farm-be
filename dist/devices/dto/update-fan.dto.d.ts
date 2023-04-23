import { Types } from 'mongoose';
export declare class UpdateFanrDto {
    gardenId: Types.ObjectId;
    fanId: Types.ObjectId;
    status: string;
}
