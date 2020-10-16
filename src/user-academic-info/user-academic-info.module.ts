import { Module } from '@nestjs/common';
import { UserAcademicInfoController } from './user-academic-info.controller';
import { UserAcademicInfoService } from './user-academic-info.service';
import { UserAcademicInfoSchema } from './dto/user-academic-info.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';
import { UserSchema } from 'src/user/dto/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserAcademicInfo', schema: UserAcademicInfoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserAcademicInfoController],
  providers: [UserAcademicInfoService, UpdateProfilePercentService],
})
export class UserAcademicInfoModule {}
