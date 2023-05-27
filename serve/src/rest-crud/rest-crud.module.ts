import { Module } from '@nestjs/common';
import { RestCrudService } from './rest-crud.service';
import { RestCrudController } from './rest-crud.controller';

@Module({
  controllers: [RestCrudController],
  providers: [RestCrudService]
})
export class RestCrudModule {}
