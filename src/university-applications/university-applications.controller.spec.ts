import { Test, TestingModule } from '@nestjs/testing';
import { UniversityApplicationsController } from './university-applications.controller';

describe('UniversityApplications Controller', () => {
  let controller: UniversityApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityApplicationsController],
    }).compile();

    controller = module.get<UniversityApplicationsController>(UniversityApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
