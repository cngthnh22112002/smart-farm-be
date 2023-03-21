import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
}
