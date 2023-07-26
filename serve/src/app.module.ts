import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestCrudModule } from './modules/api/rest-crud/rest-crud.module';
import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { MailModule } from './modules/mail/mail.module';
import { JenkinsModule } from './modules/jenkins/jenkins.module';
import { RobotModule } from './modules/robot/robot.module';
import { ConfigService } from '@nestjs/config';
import { GitlabModule } from './modules/gitlab/gitlab.module';
import { UserModule } from './modules/api/user/user.module';
import { BranchModule } from './modules/api/branch/branch.module';
import { BuildModule } from './modules/api/build/build.module';
import { NoticesModule } from './modules/api/notices/notices.module';
import { ProcessModule } from './modules/api/process/process.module';
import { ProjectModule } from './modules/api/project/project.module';
import { ServeModule } from './modules/api/serve/serve.module';
import { ProductModule } from './modules/api/product/product.module';
import { CicdModule } from './modules/api/cicd/cicd.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('MYSQL_URL'),
          port: config.get('MYSQL_PORT'),
          username: config.get('MYSQL_USER'),
          password: config.get('MYSQL_PASSWD'),
          database: config.get('MYSQL_DB'),
          entities: ['dist/src/entities/*.ts'],
          synchronize: config.get('MYSQL_ISSync'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    RestCrudModule,
    MailModule,
    JenkinsModule,
    RobotModule,
    GitlabModule,
    UserModule,
    BranchModule,
    BuildModule,
    NoticesModule,
    ProcessModule,
    ProjectModule,
    ServeModule,
    ProductModule,
    CicdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
