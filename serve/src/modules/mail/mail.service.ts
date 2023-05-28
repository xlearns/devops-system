import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface iUser {
  email: string;
  name: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserCreationConfirmation(user: iUser) {
    const { email, name } = user;
    const url = `http://localhost`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: name,
        url,
      },
    });
    return;
  }
}
