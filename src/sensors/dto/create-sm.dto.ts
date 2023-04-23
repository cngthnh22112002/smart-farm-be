import { IsNotEmpty, IsMongoId, IsNumber} from 'class-validator';
import { Types } from 'mongoose';

export class CreateSmrDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsNumber()
    value: number
}