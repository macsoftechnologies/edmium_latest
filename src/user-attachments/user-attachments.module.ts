import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAttachmentSchema } from './dto/user-attachments.schema';
import { UserAttachmentsController } from './user-attachments.controller';
import { UserAttachmentsService } from './user-attachments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserAttachment', schema: UserAttachmentSchema },
    ]),
  ],
  controllers: [UserAttachmentsController],
  providers: [UserAttachmentsService],
})
export class UserAttachmentsModule {}
