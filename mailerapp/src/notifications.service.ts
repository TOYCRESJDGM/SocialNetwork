import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NotificationsService {

    constructor(
        private readonly configService : ConfigService 
      ){}


  async sendWelcomeEmail(email:string): Promise<void> {
    try {
    
      const apiKeyPublic = this.configService.get('MAIL_API_KEY');
      const apiKeyPrivate = this.configService.get('MAIL_SECRET_KEY')

      const response = await axios.post(this.configService.get('URL_MAIL'), {
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
