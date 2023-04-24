import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Fan extends Document {
  @Prop({ type: String, default: '0' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Garden', required: true})
  gardenId: Types.ObjectId;
}

export const FanSchema = SchemaFactory.createForClass(Fan);