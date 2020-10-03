import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { AttachmentSchema } from 'src/attachments/dto/attachments.schema';
import { SharedService } from 'src/shared/shared.service';
import { UniversityInfoSchema } from './dto/university-info.schema';
import { UniversityInfoController } from './university-info.controller';
import { UniversityInfoService } from './university-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UniversityInfo', schema: UniversityInfoSchema },
      { name: 'Attachment', schema: AttachmentSchema },
    ]),
  ],
  controllers: [UniversityInfoController],
  providers: [UniversityInfoService, SharedService, AttachmentsService],
})
export class UniversityInfoModule {}
