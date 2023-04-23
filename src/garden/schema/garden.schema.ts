import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Garden extends Document {
    @Prop({ type: String, default: 'Vườn mới' })
    name: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Temperature' }], default: [] })
    temperatures: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Soilmoisture' }], default: [] })
    soilmoistures: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Humidity' }], default: [] })
    humidities: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Lights' }], default: [] })
    lights: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Fan' }], default: [] })
    fans: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Water_pump' }], default: [] })
    water_pumps: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Led' }], default: [] })
    leds: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true})
    userId: Types.ObjectId;
}

export const GardenSchema = SchemaFactory.createForClass(Garden);