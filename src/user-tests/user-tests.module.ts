import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTestsSchema } from './dto/user-tests.schema';
import { UserTestsController } from './user-tests.controller';
import { UserTestsService } from './user-tests.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserTests', schema: UserTestsSchema }]),
  ],
  controllers: [UserTestsController],
  providers: [UserTestsService],
})
export class UserTestsModule {}
