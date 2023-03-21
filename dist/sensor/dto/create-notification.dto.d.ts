import { User } from "src/user/schema/user.schema";
export declare class CreateNotificationDto {
    user: User;
    light_sensor: Array<{
        sensor_id: String;
        time: Date;
    }>;
    soilmoisture_sensor: Array<{
        sensor_id: String;
        time: Date;
    }>;
    humidity_sensor: Array<{
        sensor_id: String;
        time: Date;
    }>;
    temperature_sensor: Array<{
        sensor_id: String;
        time: Date;
    }>;
}
