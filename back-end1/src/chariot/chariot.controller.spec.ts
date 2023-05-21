import { Test, TestingModule } from '@nestjs/testing';
import { ChariotController } from './chariot.controller';
import { ChariotService } from './chariot.service';

describe('ChariotController', () => {
  let controller: ChariotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChariotController],
      providers: [ChariotService],
    }).compile();

    controller = module.get<ChariotController>(ChariotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
