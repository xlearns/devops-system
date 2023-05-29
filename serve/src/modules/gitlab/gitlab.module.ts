import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GitlabService } from './gitlab.service';

@Module({
  imports: [HttpModule],
  providers: [GitlabService],
  exports: [GitlabService],
  controllers: [],
})
export class GitlabModule {}
