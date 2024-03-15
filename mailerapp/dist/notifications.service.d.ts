import { ConfigService } from '@nestjs/config';
export declare class NotificationsService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendWelcomeEmail(email: string): Promise<void>;
}
