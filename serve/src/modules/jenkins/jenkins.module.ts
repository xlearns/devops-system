import { Module } from '@nestjs/common';
import { JenkinsService } from './jenkins.service';

@Module({
  providers: [JenkinsService],
  exports: [JenkinsService],
  controllers: [],
})
export class JenkinsModule {}
