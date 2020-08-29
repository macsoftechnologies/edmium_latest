import { Test, TestingModule } from '@nestjs/testing';
import { UserPersonalInfoService } from './user-personal-info.service';

describe('UserPersonalInfoService', () => {
  let service: UserPersonalInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPersonalInfoService],
    }).compile();

    service = module.get<UserPersonalInfoService>(UserPersonalInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
