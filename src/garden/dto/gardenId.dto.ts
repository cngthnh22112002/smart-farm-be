import { IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class GardenIdDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId
}