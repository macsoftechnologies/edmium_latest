import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrationController } from './concentration.controller';

describe('Concentration Controller', () => {
  let controller: ConcentrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcentrationController],
    }).compile();

    controller = module.get<ConcentrationController>(ConcentrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
