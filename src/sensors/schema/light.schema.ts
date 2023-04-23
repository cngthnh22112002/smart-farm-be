import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Light extends Document {
  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Garden', required: true})
  gardenId: Types.ObjectId;
}

export const LightSchema = SchemaFactory.createForClass(Light);