import { IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class FanIdDto {
    @IsNotEmpty()
    @IsMongoId()
    fanId: Types.ObjectId
}