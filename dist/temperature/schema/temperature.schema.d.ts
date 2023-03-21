import * as mongoose from 'mongoose';
import { User } from "src/user/schema/user.schema";
export declare class Temperature {
    user: User;
    temperature: Array<{
        value: Number;
        time: Date;
    }>;
}
export declare const TemperatureSchema: mongoose.Schema<Temperature, mongoose.Model<Temperature, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Temperature>;
