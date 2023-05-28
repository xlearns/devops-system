import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class RobotService {
  //企业微信 robot
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  sendWxMessage(msg: string) {
    const data = {
      msgtype: 'text',
      text: {
        content: msg,
        mentioned_list: ['@all'],
      },
    };

    this.httpService.post(this.config.get('WX_WEBHOOK_URL'), data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  //飞书 robot
  //钉钉 robot
}
