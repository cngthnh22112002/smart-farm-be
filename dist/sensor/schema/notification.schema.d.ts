import * as mongoose from 'mongoose';
import { User } from "src/user/schema/user.schema";
export declare class Temperature {
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
export declare const TemperatureSchema: mongoose.Schema<Temperature, mongoose.Model<Temperature, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Temperature>;
