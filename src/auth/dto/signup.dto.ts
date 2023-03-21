
import { IsString, IsNotEmpty, IsArray, MinLength } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly username: String

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: String
}