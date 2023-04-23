import { IsNotEmpty, IsMongoId, IsNumber} from 'class-validator';
import { Types } from 'mongoose';

export class CreateHumirDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsNumber()
    value: number
}