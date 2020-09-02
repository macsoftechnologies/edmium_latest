import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationChatController } from './application-chat.controller';

describe('ApplicationChat Controller', () => {
  let controller: ApplicationChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationChatController],
    }).compile();

    controller = module.get<ApplicationChatController>(ApplicationChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
