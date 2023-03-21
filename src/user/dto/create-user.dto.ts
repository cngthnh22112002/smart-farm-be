import { Temperature } from "src/temperature/schema/temperature.schema"
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: String

    @IsNotEmpty()
    @IsString()
    readonly password: String

}