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

  async findAll() {
    return await this.ProductRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
