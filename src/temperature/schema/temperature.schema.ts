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
          value: {type: Number, required: true},
          time: {type: Date, required: true},
        },
    ])
    temperature: Array<{ value: Number; time: Date }>;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);