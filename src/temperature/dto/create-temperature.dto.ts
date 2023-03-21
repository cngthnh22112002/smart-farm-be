import { IsArray, IsEmpty } from "class-validator";
import { User } from "src/user/schema/user.schema";


export class CreateTemperatureDto {
    @IsEmpty()
    user: User;

    @IsArray()
    temperature: Array<{ value: Number; time: Date }>;
}