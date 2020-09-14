import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentSchema } from './dto/attachments.schema';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attachment', schema: AttachmentSchema },
    ]),
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, SharedService],
})
export class AttachmentsModule {}
