import { IsString, IsOptional, IsEmail, IsDate, Length} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsDate()
    birthdate: Date;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    @Length(10)
    phone: string;
}