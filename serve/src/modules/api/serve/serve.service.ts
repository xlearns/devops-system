import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serve } from '@/entities/Serve';

@Injectable()
export class ServeService {
  constructor(
    @InjectRepository(Serve) private readonly ServeRepo: Repository<Serve>,
  ) {}

  create(rep: Serve) {
    delete rep.id;
    return this.ServeRepo.save(rep);
  }

  findAll() {
    const data = this.ServeRepo.find();
    return {
      data,
    };
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, data: Serve) {
    await this.findOneById(id);
    delete data.id;
    this.ServeRepo.update(id, data);
  }

  async remove(id: number) {
    await this.findOneById(id);
    this.ServeRepo.delete(id);
  }

  private async findOneById(id: number): Promise<Serve> {
    const userInfo = await this.ServeRepo.findOneById(id);
    if (!userInfo) {
      throw new HttpException(`指定 id=${id} 的SERVE不存在`, 404);
    }
    return userInfo;
  }
}
