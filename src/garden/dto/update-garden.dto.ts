import { IsNotEmpty, IsMongoId, IsString, IsOptional} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateGardenDto {
    @IsNotEmpty()
    @IsMongoId()
    gardenId: Types.ObjectId

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string
}