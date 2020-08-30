import { Test, TestingModule } from '@nestjs/testing';
import { UserAcademicInfoService } from './user-academic-info.service';

describe('UserAcademicInfoService', () => {
  let service: UserAcademicInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAcademicInfoService],
    }).compile();

    service = module.get<UserAcademicInfoService>(UserAcademicInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
