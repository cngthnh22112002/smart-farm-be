import { Types } from 'mongoose';
export declare class UpdatePumprDto {
    gardenId: Types.ObjectId;
    pumpId: Types.ObjectId;
    status: string;
}
