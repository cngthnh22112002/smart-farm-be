import { IsString, IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateLedrDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    ledId: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    status: string
  
}