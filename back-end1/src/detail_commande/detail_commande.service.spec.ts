import { Test, TestingModule } from '@nestjs/testing';
import { DetailCommandeService } from './detail_commande.service';

describe('DetailCommandeService', () => {
  let service: DetailCommandeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCommandeService],
    }).compile();

    service = module.get<DetailCommandeService>(DetailCommandeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
