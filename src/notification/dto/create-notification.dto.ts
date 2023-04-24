import { IsNotEmpty, IsString, IsOptional, IsMongoId, IsBoolean, IsDateString} from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    message: string

    @IsOptional()
    @IsBoolean()
    isRead: Boolean;

    @IsOptional()
    @IsDateString()
    createdAt: Date;

}