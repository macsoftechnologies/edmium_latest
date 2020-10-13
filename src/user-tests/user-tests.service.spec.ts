import { Test, TestingModule } from '@nestjs/testing';
import { UserTestsService } from './user-tests.service';

describe('UserTestsService', () => {
  let service: UserTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestsService],
    }).compile();

    service = module.get<UserTestsService>(UserTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
