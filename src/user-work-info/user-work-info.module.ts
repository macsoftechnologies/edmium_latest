import { Module } from '@nestjs/common';
import { UserWorkInfoController } from './user-work-info.controller';
import { UserWorkInfoService } from './user-work-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserWorkInfoSchema } from './dto/user-work-info.schema';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';
import { UserSchema } from 'src/user/dto/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserWorkInfo', schema: UserWorkInfoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserWorkInfoController],
  providers: [UserWorkInfoService, UpdateProfilePercentService],
})
export class UserWorkInfoModule {}
