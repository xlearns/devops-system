import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './shared/interceptors/ResponseFormat';
import { AllExceptionsFilter } from './shared/interceptors/HttpExceptionFilter';
import { ConfigService } from '@nestjs/config';
import fastify from 'fastify';
import type { RawServerDefault } from 'fastify';
import { FastifyLogger } from './logger';

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger({
      fileName: 'user-center',
    }),
  });

  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter(fastifyInstance as unknown as RawServerDefault),
  );
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
