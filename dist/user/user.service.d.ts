import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    getCurrentUser(user: User): Promise<User>;
    updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User>;
}
