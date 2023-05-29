import { Module } from '@nestjs/common';
import { RestCrudService } from './rest-crud.service';
import { RestCrudController } from './rest-crud.controller';
import { GitlabModule } from './../gitlab/gitlab.module';

@Module({
  imports:[GitlabModule],
  controllers: [RestCrudController],
  providers: [RestCrudService],
})
export class RestCrudModule {}
