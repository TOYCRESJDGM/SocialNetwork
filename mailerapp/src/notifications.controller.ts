import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern("user_created")
  async handleSendMail(data: {email:string, name:string}){
    return this.notificationsService.sendWelcomeEmail(data.email)
  }
}