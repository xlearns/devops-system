import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/entities/Product';

import { GitlabModule } from '@/modules/gitlab/gitlab.module';
import { JenkinsModule } from '@/modules/jenkins/jenkins.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), GitlabModule, JenkinsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
