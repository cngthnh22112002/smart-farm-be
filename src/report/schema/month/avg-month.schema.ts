import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class AVGMonth extends Document {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true })
  average: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Garden', required: true})
  gardenId: Types.ObjectId;
}

export const AVGMonthSchema = SchemaFactory.createForClass(AVGMonth);