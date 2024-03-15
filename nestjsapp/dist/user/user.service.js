"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, clientNotification) {
        this.userRepository = userRepository;
        this.clientNotification = clientNotification;
    }
    async userCount() {
        return await this.userRepository.count();
    }
    async findByEmail(email) {
        try {
            return await this.userRepository.findOne({ where: { email } });
        }
        catch (err) {
            throw err;
        }
    }
    async findById(id) {
        try {
            return await this.userRepository.findOne({
                where: { id },
                select: ['id', 'email', 'fullName', 'age', 'createdDate'],
            });
        }
        catch (err) {
            throw err;
        }
    }
    async findByFullName(name) {
        try {
            return await this.userRepository.find({
                where: { fullName: (0, typeorm_2.Like)(`%${name}%`) },
                select: ['id', 'email', 'fullName', 'age', 'createdDate'],
            });
        }
        catch (err) {
            throw err;
        }
    }
    async createUser(register) {
        const { fullName, age, email, password } = register;
        try {
            const emailIsTaken = await this.findByEmail(email);
            if (emailIsTaken) {
                throw new common_1.HttpException(`${email} is already registered.`, common_1.HttpStatus.CONFLICT);
            }
            else {
                const id = (0, uuid_1.v4)();
                const hashedPassword = await (0, bcrypt_1.hash)(password, 12);
                await this.userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(user_entity_1.User)
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
                };
                this.clientNotification.emit('user_created', mockUser);
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteUser(password, id) {
        try {
            const userToDelete = await this.userRepository.findOne({ where: { id } });
            if ((0, bcrypt_1.compare)(password, userToDelete.password)) {
                userToDelete.deletedAt = new Date();
                await this.userRepository.save(userToDelete);
                return { message: 'User successfully deleted' };
            }
        }
        catch (err) {
            throw err;
        }
    }
    async updateUser(name, email, age, id) {
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
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        microservices_1.ClientProxy])
], UserService);
//# sourceMappingURL=user.service.js.map