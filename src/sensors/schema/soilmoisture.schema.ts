import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Soilmoisture extends Document {
  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Garden', required: true})
  gardenId: Types.ObjectId;
}

export const SoilmoistureSchema = SchemaFactory.createForClass(Soilmoisture);