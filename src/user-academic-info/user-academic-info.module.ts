import { Module } from '@nestjs/common';
import { UserAcademicInfoController } from './user-academic-info.controller';
import { UserAcademicInfoService } from './user-academic-info.service';
import { UserAcademicInfoSchema } from './dto/user-academic-info.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserAcademicInfo', schema: UserAcademicInfoSchema },
    ]),
  ],
  controllers: [UserAcademicInfoController],
  providers: [UserAcademicInfoService],
})
export class UserAcademicInfoModule {}
