import { Test, TestingModule } from '@nestjs/testing';
import { RestCrudService } from './rest-crud.service';

describe('RestCrudService', () => {
  let service: RestCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestCrudService],
    }).compile();

    service = module.get<RestCrudService>(RestCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
