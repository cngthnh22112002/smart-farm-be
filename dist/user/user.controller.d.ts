import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getCurrentUser(req: any): Promise<User>;
    updateUser(req: any, updateUser: UpdateUserDto): Promise<User>;
}
