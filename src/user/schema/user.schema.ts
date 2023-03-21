import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class User extends Document {
    @Prop({username: String, required: true, unique: true})
    username: String;

    @Prop({password: String, required: true})
    password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);