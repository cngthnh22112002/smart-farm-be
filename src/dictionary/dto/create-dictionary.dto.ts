import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNewDictionaryDto {
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