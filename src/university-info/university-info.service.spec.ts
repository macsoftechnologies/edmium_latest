import { Test, TestingModule } from '@nestjs/testing';
import { UniversityInfoService } from './university-info.service';

describe('UniversityInfoService', () => {
  let service: UniversityInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversityInfoService],
    }).compile();

    service = module.get<UniversityInfoService>(UniversityInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
