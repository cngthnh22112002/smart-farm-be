import { IsNotEmpty, IsMongoId, IsNumber, IsString} from 'class-validator';
import { Types } from 'mongoose';

export class ReportDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    type: string
}