import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateDictionaryDto {
    @IsNotEmpty()
    @IsMongoId()
    dictionaryId: Types.ObjectId;

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    content: string

    @IsOptional()
    @IsDate()
    createdAt: Date
}