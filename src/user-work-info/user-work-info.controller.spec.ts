import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkInfoController } from './user-work-info.controller';

describe('UserWorkInfo Controller', () => {
  let controller: UserWorkInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWorkInfoController],
    }).compile();

    controller = module.get<UserWorkInfoController>(UserWorkInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
