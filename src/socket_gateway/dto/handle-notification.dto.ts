import { IsString, IsDate } from "class-validator";


export class HandleNotificationDto {
    @IsString()
    sensor_type: string 

    @IsString()
    sensor_id: string 

    @IsDate()
    time: Date
}