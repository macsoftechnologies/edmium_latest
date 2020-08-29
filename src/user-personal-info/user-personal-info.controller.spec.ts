import { Test, TestingModule } from '@nestjs/testing';
import { UserPersonalInfoController } from './user-personal-info.controller';

describe('UserPersonalInfo Controller', () => {
  let controller: UserPersonalInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPersonalInfoController],
    }).compile();

    controller = module.get<UserPersonalInfoController>(UserPersonalInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
