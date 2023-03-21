import { IsArray, IsEmpty, IsOptional } from "class-validator";
import { User } from "src/user/schema/user.schema";


export class CreateNotificationDto {
    user: User;

    @IsOptional()
    @IsArray()
    light_sensor: Array<{ sensor_id: String; time: Date }>;

    @IsOptional()
    @IsArray()
    soilmoisture_sensor: Array<{ sensor_id: String; time: Date }>;

    @IsOptional()
    @IsArray()
    humidity_sensor: Array<{ sensor_id: String; time: Date }>;

    @IsOptional()
    @IsArray()
    temperature_sensor: Array<{ sensor_id: String; time: Date }>;

}