import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import {GitlabService} from '@/modules/gitlab/gitlab.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly gitlab: GitlabService,
  ) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    req['context'] = req['context'] || {};
    this.gitlab.auth(token);
    try {
      req['context']['token'] = token;
    } finally {
      next();
    }
  }
}
