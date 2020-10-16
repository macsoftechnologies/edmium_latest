import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';
import { UserSchema } from 'src/user/dto/user.schema';
import { UserTestsSchema } from './dto/user-tests.schema';
import { UserTestsController } from './user-tests.controller';
import { UserTestsService } from './user-tests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserTests', schema: UserTestsSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserTestsController],
  providers: [UserTestsService, UpdateProfilePercentService],
})
export class UserTestsModule {}
