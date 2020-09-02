import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationChatService } from './application-chat.service';

describe('ApplicationChatService', () => {
  let service: ApplicationChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationChatService],
    }).compile();

    service = module.get<ApplicationChatService>(ApplicationChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
