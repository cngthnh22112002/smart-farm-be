import { IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class LedIdDto {
    @IsNotEmpty()
    @IsMongoId()
    ledId: Types.ObjectId
}