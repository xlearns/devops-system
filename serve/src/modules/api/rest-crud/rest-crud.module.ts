import { Module } from '@nestjs/common';
import { RestCrudService } from './rest-crud.service';
import { RestCrudController } from './rest-crud.controller';

//other Module
import { GitlabModule } from '@/modules/gitlab/gitlab.module';
import { JenkinsModule } from '@/modules/jenkins/jenkins.module';

@Module({
  imports:[GitlabModule,JenkinsModule],
  controllers: [RestCrudController],
  providers: [RestCrudService],
})
export class RestCrudModule {}
