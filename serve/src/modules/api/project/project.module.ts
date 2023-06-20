import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
//other Module
import { GitlabModule } from '@/modules/gitlab/gitlab.module';

@Module({
  imports:[GitlabModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  
})
export class ProjectModule {}
