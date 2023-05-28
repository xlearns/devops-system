import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestCrudModule } from './modules/rest-crud/rest-crud.module';
import { AuthMiddleware } from './shared/middleware/auto';
import { MailModule } from './modules/mail/mail.module';
import { JenkinsModule } from './modules/jenkins/jenkins.module';
import { RobotModule } from './modules/robot/robot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot()
    RestCrudModule,
    MailModule,
    JenkinsModule,
    RobotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // * 代表该中间件在所有路由均生效
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
