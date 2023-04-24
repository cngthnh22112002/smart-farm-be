import { IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class AllIdDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    ledId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    fanId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    pumpId: Types.ObjectId
}