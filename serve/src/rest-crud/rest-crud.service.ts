import { Injectable } from '@nestjs/common';
import { CreateRestCrudDto } from './dto/create-rest-crud.dto';
import { UpdateRestCrudDto } from './dto/update-rest-crud.dto';

@Injectable()
export class RestCrudService {
  create(createRestCrudDto: CreateRestCrudDto) {
    return 'This action adds a new restCrud';
  }

  findAll() {
    return `This action returns all restCrud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restCrud`;
  }

  update(id: number, updateRestCrudDto: UpdateRestCrudDto) {
    return `This action updates a #${id} restCrud`;
  }

  remove(id: number) {
    return `This action removes a #${id} restCrud`;
  }
}
