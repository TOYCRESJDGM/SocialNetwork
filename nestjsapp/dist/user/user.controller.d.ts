import { UserService } from './user.service';
import { User as UserEntity } from './user.entity';
import { UpdateUser } from './update.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserByName(query: any): Promise<UserEntity[]>;
    getUserById(params: any): Promise<UserEntity>;
    updateUser(req: any, body: UpdateUser): Promise<{
        message: string;
    }>;
    deleteUser(req: any, body: {
        password: string;
    }): Promise<{
        message: string;
    }>;
}
