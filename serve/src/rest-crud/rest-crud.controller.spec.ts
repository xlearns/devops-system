import { Test, TestingModule } from '@nestjs/testing';
import { RestCrudController } from './rest-crud.controller';
import { RestCrudService } from './rest-crud.service';

describe('RestCrudController', () => {
  let controller: RestCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestCrudController],
      providers: [RestCrudService],
    }).compile();

    controller = module.get<RestCrudController>(RestCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
