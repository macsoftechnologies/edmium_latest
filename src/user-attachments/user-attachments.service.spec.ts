import { Test, TestingModule } from '@nestjs/testing';
import { UserAttachmentsService } from './user-attachments.service';

describe('UserAttachmentsService', () => {
  let service: UserAttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAttachmentsService],
    }).compile();

    service = module.get<UserAttachmentsService>(UserAttachmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
