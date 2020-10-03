import { Test, TestingModule } from '@nestjs/testing';
import { UniversityInfoController } from './university-info.controller';

describe('UniversityInfo Controller', () => {
  let controller: UniversityInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityInfoController],
    }).compile();

    controller = module.get<UniversityInfoController>(UniversityInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
