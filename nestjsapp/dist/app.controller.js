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
exports.AppController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth/auth.service");
const user_service_1 = require("./user/user.service");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./login.dto");
const register_dto_1 = require("./register.dto");
let AppController = class AppController {
    constructor(appService, authService, userService) {
        this.appService = appService;
        this.authService = authService;
        this.userService = userService;
    }
    async login(login) {
        return this.authService.login(login);
    }
    async register(register) {
        try {
            await this.userService.createUser(register);
            const login = {
                email: register.email,
                password: register.password
            };
            return await this.authService.login(Object.assign({}, login));
        }
        catch (err) {
            throw err;
        }
    }
    async logout(req, response) {
        response.clearCookie('access_token');
        return { message: 'session successfully closed' };
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Post)('auth/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.Login]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Post)('auth/register'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.Register]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('auth/logout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService,
        user_service_1.UserService])
], AppController);
//# sourceMappingURL=app.controller.js.map