import { Test, TestingModule } from '@nestjs/testing';
import { UserTestsController } from './user-tests.controller';

describe('UserTests Controller', () => {
  let controller: UserTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestsController],
    }).compile();

    controller = module.get<UserTestsController>(UserTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
