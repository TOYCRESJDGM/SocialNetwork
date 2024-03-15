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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let NotificationsService = class NotificationsService {
    constructor(configService) {
        this.configService = configService;
    }
    async sendWelcomeEmail(email) {
        try {
            const apiKeyPublic = this.configService.get('MAIL_API_KEY');
            const apiKeyPrivate = this.configService.get('MAIL_SECRET_KEY');
            const response = await axios_1.default.post(this.configService.get('URL_MAIL'), {
                Messages: [
                    {
                        From: {
                            Email: this.configService.get('FROM_EMAIL'),
                            Name: 'Host',
                        },
                        To: [
                            {
                                Email: email,
                                Name: 'NEW USER',
                            },
                        ],
                        Subject: 'WELCOME THE NEW SOCIAL NEWORK!',
                        TextPart: 'SHARE AS MUCH AS YOU WANT!',
                        HTMLPart: '<p>A simple, fun and creative way to write, edit and share code, repositories and messages with friends, colleagues, family and strangers.<p>',
                    },
                ],
            }, {
                auth: {
                    username: apiKeyPublic,
                    password: apiKeyPrivate,
                },
            });
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map