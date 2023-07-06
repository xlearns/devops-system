import { Test, TestingModule } from '@nestjs/testing';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';

describe('ServeController', () => {
  let controller: ServeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServeController],
      providers: [ServeService],
    }).compile();

    controller = module.get<ServeController>(ServeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
