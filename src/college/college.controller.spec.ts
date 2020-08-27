import { Test, TestingModule } from '@nestjs/testing';
import { CollegeController } from './college.controller';

describe('College Controller', () => {
  let controller: CollegeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollegeController],
    }).compile();

    controller = module.get<CollegeController>(CollegeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
