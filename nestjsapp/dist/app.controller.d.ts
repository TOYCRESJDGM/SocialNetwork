import { Response, Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { Login } from './login.dto';
import { Register } from './register.dto';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    private readonly userService;
    constructor(appService: AppService, authService: AuthService, userService: UserService);
    login(login: Login): Promise<{
        message: string;
        access_token: string;
    }>;
    register(register: Register): Promise<any>;
    logout(req: Request, response: Response): Promise<{
        message: string;
    }>;
}
