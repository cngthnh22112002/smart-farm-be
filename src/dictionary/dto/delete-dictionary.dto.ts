import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteDictionaryDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: Types.ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    dictionaryId: Types.ObjectId;
}