import { Module } from '@nestjs/common';
import { UserWorkInfoController } from './user-work-info.controller';
import { UserWorkInfoService } from './user-work-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserWorkInfoSchema } from './dto/user-work-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserWorkInfo', schema: UserWorkInfoSchema },
    ]),
  ],
  controllers: [UserWorkInfoController],
  providers: [UserWorkInfoService],
})
export class UserWorkInfoModule {}
