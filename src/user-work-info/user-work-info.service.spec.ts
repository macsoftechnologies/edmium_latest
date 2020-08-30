import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkInfoService } from './user-work-info.service';

describe('UserWorkInfoService', () => {
  let service: UserWorkInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWorkInfoService],
    }).compile();

    service = module.get<UserWorkInfoService>(UserWorkInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
