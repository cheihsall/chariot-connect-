import { Test, TestingModule } from '@nestjs/testing';
import { ChariotService } from './chariot.service';

describe('ChariotService', () => {
  let service: ChariotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChariotService],
    }).compile();

    service = module.get<ChariotService>(ChariotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
