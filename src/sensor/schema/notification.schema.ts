import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/user/schema/user.schema";

@Schema()
export class Temperature {
    @Prop(
      {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    )
    user: User

    @Prop([
        {
          sensor_id: {type: String, required: true},
          time: {type: Date, required: true},
        },
    ])
    light_sensor: Array<{ sensor_id: String; time: Date }>;

    @Prop([
        {
          sensor_id: {type: String, required: true},
          time: {type: Date, required: true},
        },
    ])
    soilmoisture_sensor: Array<{ sensor_id: String; time: Date }>;

    @Prop([
        {
          sensor_id: {type: String, required: true},
          time: {type: Date, required: true},
        },
    ])
    humidity_sensor: Array<{ sensor_id: String; time: Date }>;

    @Prop([
        {
          sensor_id: {type: String, required: true},
          time: {type: Date, required: true},
        },
    ])
    temperature_sensor: Array<{ sensor_id: String; time: Date }>;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);