import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProfilePercentService } from './update-profile-percent';

describe('UpdateProfilePercentService', () => {
  let service: UpdateProfilePercentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProfilePercentService],
    }).compile();

    service = module.get<UpdateProfilePercentService>(
      UpdateProfilePercentService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
