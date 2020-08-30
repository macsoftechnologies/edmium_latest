import { Test, TestingModule } from '@nestjs/testing';
import { UserAcademicInfoController } from './user-academic-info.controller';

describe('UserAcademicInfo Controller', () => {
  let controller: UserAcademicInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAcademicInfoController],
    }).compile();

    controller = module.get<UserAcademicInfoController>(UserAcademicInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
