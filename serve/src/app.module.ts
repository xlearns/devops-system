import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestCrudModule } from './rest-crud/rest-crud.module';

@Module({
  imports: [RestCrudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
