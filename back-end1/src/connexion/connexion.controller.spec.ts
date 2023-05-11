import { Test, TestingModule } from '@nestjs/testing';
import { ConnexionController } from './connexion.controller';
import { ConnexionService } from './connexion.service';

describe('ConnexionController', () => {
  let controller: ConnexionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnexionController],
      providers: [ConnexionService],
    }).compile();

    controller = module.get<ConnexionController>(ConnexionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
