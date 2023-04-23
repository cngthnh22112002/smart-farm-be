import { IsNotEmpty, IsMongoId, IsNumber} from 'class-validator';
import { Types } from 'mongoose';

export class CreateTemprDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsNumber()
    value: number
}