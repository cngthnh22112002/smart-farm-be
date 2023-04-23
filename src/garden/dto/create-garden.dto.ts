import { IsNotEmpty, IsString, IsOptional, IsNumber} from 'class-validator';

export class CreateGardenDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    nums_led: number

    @IsOptional()
    @IsNumber()
    nums_fan: number

    @IsOptional()
    @IsNumber()
    nums_pump: number

}