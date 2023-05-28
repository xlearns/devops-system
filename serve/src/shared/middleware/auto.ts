import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    req['context'] = req['context'] || {};
    if (!token) return next();

    try {
      // 使用 token 查询相关的用户信息，如果该函数抛出错误，说明 token 无效，则用户信息不会被写入 req.context 中
      req['context']['token'] = token;
    } finally {
      next();
    }
  }
}
