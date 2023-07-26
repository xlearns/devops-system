import { Module } from '@nestjs/common';
import { CicdService } from './cicd.service';
import { CicdController } from './cicd.controller';
import { JenkinsModule } from '@/modules/jenkins/jenkins.module';

@Module({
  imports: [JenkinsModule],
  controllers: [CicdController],
  providers: [CicdService],
})
export class CicdModule {}
