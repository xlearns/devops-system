import { Module } from '@nestjs/common';
import { ServeService } from './serve.service';
import { ServeController } from './serve.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Serve } from '@/entities/Serve';

@Module({
  imports: [TypeOrmModule.forFeature([Serve])],
  controllers: [ServeController],
  providers: [ServeService],
})
export class ServeModule {}
