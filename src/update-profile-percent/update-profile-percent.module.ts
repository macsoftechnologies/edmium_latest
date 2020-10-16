import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';
import { UserSchema } from 'src/user/dto/user.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [],
  providers: [UpdateProfilePercentService],
})
export class UpdateProfilePercentModule {}
