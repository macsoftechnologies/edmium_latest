import { Test, TestingModule } from '@nestjs/testing';
import { UserAttachmentsController } from './user-attachments.controller';

describe('UserAttachments Controller', () => {
  let controller: UserAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAttachmentsController],
    }).compile();

    controller = module.get<UserAttachmentsController>(UserAttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
