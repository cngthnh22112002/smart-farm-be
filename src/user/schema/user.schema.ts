import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema()
export class User extends Document {
    @Prop({type: String, required: true, unique: true})
    username: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: String})
    name?: string;

    @Prop({type: String})
    email?: string;

    @Prop({type: Date})
    birthdate?: Date;

    @Prop({type: String})
    address?: string;

    @Prop({type: String})
    phone?: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Garden' }], default: [] })
    gardens: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }], default: [] })
    notifications: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Dictionary' }], default: [] })
    dictionaries: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);