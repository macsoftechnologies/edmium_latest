import { Module } from '@nestjs/common';
import { ApplicationChatController } from './application-chat.controller';
import { ApplicationChatService } from './application-chat.service';
import { ApplicationChatSchema } from './dto/application-chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/dto/user.schema';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ApplicationChat', schema: ApplicationChatSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ApplicationChatController],
  providers: [ApplicationChatService, SharedService],
})
export class ApplicationChatModule {}
