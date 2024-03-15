import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Like } from 'typeorm';
import { ClientProxy} from '@nestjs/microservices';
import { v4 } from 'uuid';
import { hash, compare } from 'bcryptjs';
import { Register } from 'src/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject('NOTIFICATION_SERVICE') private clientNotification: ClientProxy,
  ) {}

  async userCount(): Promise<number> {
    return await this.userRepository.count();
  }

  async findByEmail(email): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        select: ['id', 'email', 'fullName', 'age', 'createdDate'],
      });
    } catch (err) {
      throw err;
    }
  }

  async findByFullName(name: string): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { fullName: Like(`%${name}%`) },
        select: ['id', 'email', 'fullName', 'age', 'createdDate'],
      });
    } catch (err) {
      throw err;
    }
  }

  async createUser( register: Register ): Promise<void> {
    const {fullName, age, email, password} = register
    try {
      // Check if email is already registered
      const emailIsTaken = await this.findByEmail(email);
      if (emailIsTaken) {
        throw new HttpException(
          `${email} is already registered.`,
          HttpStatus.CONFLICT,
        );
      } else {
        //   generate uuid for user id
        const id = v4();

        // Hash password before saving to db
        const hashedPassword = await hash(password, 12);
        //// Create new user & Save User to db
        await this.userRepository
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            id,
            fullName,
            age,
            email,
            password: hashedPassword,
          })
          .execute();

        const mockUser = {
          email,
          fullName
        }
        this.clientNotification.emit('user_created', mockUser)


      }
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(password: string, id: string): Promise<{ message: string }> {
    try {
      // Require password to delete
      const userToDelete = await this.userRepository.findOne({ where: { id } });
      if (compare(password, userToDelete.password)) {
        // delete user
        userToDelete.deletedAt = new Date();

        await this.userRepository.save(userToDelete);

        return { message: 'User successfully deleted' };
      }
    } catch (err) {
      throw err;
    }
  }

  async updateUser(
    name: string,
    email: string,
    age: number,
    id: string,
  ): Promise<{ message: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }

      if (email) {
        const userEmail = await this.findByEmail(email);
        if (userEmail.id != user.id) {
          throw new Error('Invalid Email');
        }
      }

      user.fullName = name;
      user.email = email;
      user.age = age;

      await this.userRepository.save(user);
      return { message: 'User update Sucessfully' };
    } catch (err) {
      throw err;
    }
  }
}
