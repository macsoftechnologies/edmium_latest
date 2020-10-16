import { Module } from '@nestjs/common';
import { UserPersonalInfoController } from './user-personal-info.controller';
import { UserPersonalInfoService } from './user-personal-info.service';
import { UserPersonalInfoSchema } from './dto/user-personal-info.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/dto/user.schema';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserPersonalInfo', schema: UserPersonalInfoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserPersonalInfoController],
  providers: [UserPersonalInfoService, UpdateProfilePercentService],
})
export class UserPersonalInfoModule {}
