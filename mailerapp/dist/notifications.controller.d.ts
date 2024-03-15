import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    handleSendMail(data: {
        email: string;
        name: string;
    }): Promise<void>;
}
