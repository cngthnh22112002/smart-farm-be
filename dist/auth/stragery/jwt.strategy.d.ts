import { Strategy } from "passport-jwt";
import { User } from "src/user/schema/user.schema";
import * as mongoose from 'mongoose';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    validate(payload: any): Promise<User & {
        _id: mongoose.Types.ObjectId;
    }>;
}
export {};
