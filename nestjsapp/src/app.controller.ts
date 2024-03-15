import { Controller, Res, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Login } from './login.dto';
import { Register } from './register.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /*
    Route:  POST/login
    desc: Login with req.body & return jwt
  */
  @ApiTags('auth')
  @Post('auth/login')
  async login(@Body() login: Login) {
    return this.authService.login(login);
  }

  @ApiTags('auth')
  @Post('auth/register')
  async register(@Body() register: Register): Promise<any> {
    try {

      await this.userService.createUser(register);
      const login : Login = {
        email: register.email,
        password: register.password
      }
      
      return await this.authService.login({ ...login });
    } catch (err) {
      throw err;
    }
  }


  @ApiTags('auth')
  @ApiBearerAuth()
  @Post('auth/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('access_token');
    return { message: 'session successfully closed' };
  }
}
