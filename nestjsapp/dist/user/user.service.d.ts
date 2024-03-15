import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Register } from 'src/register.dto';
export declare class UserService {
    private readonly userRepository;
    private clientNotification;
    constructor(userRepository: Repository<User>, clientNotification: ClientProxy);
    userCount(): Promise<number>;
    findByEmail(email: any): Promise<User>;
    findById(id: string): Promise<User>;
    findByFullName(name: string): Promise<User[]>;
    createUser(register: Register): Promise<void>;
    deleteUser(password: string, id: string): Promise<{
        message: string;
    }>;
    updateUser(name: string, email: string, age: number, id: string): Promise<{
        message: string;
    }>;
}
