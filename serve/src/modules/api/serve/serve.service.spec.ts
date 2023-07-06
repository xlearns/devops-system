import { Test, TestingModule } from '@nestjs/testing';
import { ServeService } from './serve.service';

describe('ServeService', () => {
  let service: ServeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServeService],
    }).compile();

    service = module.get<ServeService>(ServeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
