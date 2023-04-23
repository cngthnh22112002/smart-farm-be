import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async getCurrentUser(user: User): Promise<User> {
        return user;
    }

    async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate(
            user._id, 
            updateUserDto,
            { new: true }
        ).exec();

        if (!updatedUser) {
          throw new NotFoundException(`User with ID ${user._id} not found`);
        }
        return updatedUser;
    }

}
