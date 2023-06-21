import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      code: httpStatus,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: '',
    };

    if (exception instanceof HttpException) {
      responseBody.message =
        exception.getResponse()['message'] ||
        exception.getResponse()['error'] ||
        'Unknown error';
    } else {
      responseBody.message = exception['message'] || 'Unknown error';
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
