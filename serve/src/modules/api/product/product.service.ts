import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/entities/Product';
import { interceptOfKey } from '@/shared/utils/command';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
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
      'env',
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
    await this.findOneById(id);
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
