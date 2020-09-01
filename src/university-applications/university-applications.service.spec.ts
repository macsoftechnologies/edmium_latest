import { Test, TestingModule } from '@nestjs/testing';
import { UniversityApplicationsService } from './university-applications.service';

describe('UniversityApplicationsService', () => {
  let service: UniversityApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversityApplicationsService],
    }).compile();

    service = module.get<UniversityApplicationsService>(UniversityApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
