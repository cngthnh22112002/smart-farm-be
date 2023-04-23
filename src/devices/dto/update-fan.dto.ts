import { IsString, IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateFanrDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    fanId: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    status: string
  
}