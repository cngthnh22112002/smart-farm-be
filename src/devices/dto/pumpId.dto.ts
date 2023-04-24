import { IsNotEmpty, IsMongoId} from 'class-validator';
import { Types } from 'mongoose';

export class PumpIdDto {
    @IsNotEmpty()
    @IsMongoId()
    pumpId: Types.ObjectId
}