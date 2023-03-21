import { User } from "src/user/schema/user.schema";
export declare class CreateTemperatureDto {
    user: User;
    temperature: Array<{
        value: Number;
        time: Date;
    }>;
}
