import { Types } from 'mongoose';
export declare class UpdateDictionaryDto {
    dictionaryId: Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
}
