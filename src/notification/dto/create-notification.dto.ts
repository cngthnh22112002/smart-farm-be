import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDateString} from 'class-validator';

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    message: string

    @IsOptional()
    @IsBoolean()
    isRead: Boolean;

    @IsOptional()
    @IsDateString()
    createdAt: Date;

}