import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/entities/Product';
import { interceptOfKey } from '@/shared/utils/command';
import { GitlabService } from '@/modules/gitlab/gitlab.service';
import { JenkinsService } from '@/modules/jenkins/jenkins.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
    private readonly gitlab: GitlabService,
    private readonly JenkinsService: JenkinsService,
  ) {}

  async create(rep: Product) {
    if (!rep) {
      throw new HttpException(
        { message: 'The product must be delivered.', code: 400 },
        400,
      );
    }
    delete rep.id;
    const intercept = interceptOfKey(rep, [
      'name',
      'description',
      'branch',
      'cicd',
      'gitlab',
    ]);
    if (intercept) {
      throw new HttpException(intercept, 400);
    }
    await this.ProductRepo.save(rep);
    return {
      data: 'Created successfully',
    };
  }

  async update(id: number, data: Product) {
    await this.findOneById(id);
    delete data.id;
    await this.ProductRepo.update(id, data);
    return {
      data: 'modified successfully',
    };
  }

  async findAll() {
    return await this.ProductRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async remove(id: number) {
    const { gitlab, id: idx } = await this.findOneById(id);

    if (gitlab) {
      const { hooksId, key } = gitlab;
      const name = `${key}-${idx}`;
      this.gitlab.removeWebHookApi(key, hooksId).catch((e) => {});
      this.JenkinsService.deleteJenkins(name).catch((e) => {});
    }
    await this.ProductRepo.delete(id);
    return {
      data: 'delete successfully',
    };
  }

  private async findOneById(id: number): Promise<Product> {
    const userInfo = await this.ProductRepo.findOneById(id);
    if (!userInfo) {
      throw new HttpException(`指定 id=${id} 的Product不存在`, 404);
    }
    return userInfo;
  }
}
