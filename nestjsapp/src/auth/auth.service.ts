import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const passwordsMatch = await compare(password, user.password);
      if (passwordsMatch) {
        const { ...result } = user;
        return result;
      }
      throw new HttpException('Password incorrect', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    console.log("User")
    console.log(user)
    const validate = await this.validateUser(user.email, user.password);

    const payload = { email: user.email, sub: validate.id };

    return {
      message: `Welcome ${validate.fullName}`,
      access_token: this.jwtService.sign(payload),
    };
  }
}
