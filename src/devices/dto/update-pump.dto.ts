import { IsString, IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePumprDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    pumpId: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    status: string
  
}