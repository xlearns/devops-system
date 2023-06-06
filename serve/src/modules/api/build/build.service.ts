import { Injectable } from '@nestjs/common';
import { CreateBuildDto } from './dto/create-build.dto';
import { UpdateBuildDto } from './dto/update-build.dto';

@Injectable()
export class BuildService {
  create(createBuildDto: CreateBuildDto) {
    return 'This action adds a new build';
  }

  findAll() {
    return `This action returns all build`;
  }

  findOne(id: number) {
    return `This action returns a #${id} build`;
  }

  update(id: number, updateBuildDto: UpdateBuildDto) {
    return `This action updates a #${id} build`;
  }

  remove(id: number) {
    return `This action removes a #${id} build`;
  }
}
