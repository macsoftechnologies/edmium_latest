import { Module } from '@nestjs/common';
import { ApplicationChatController } from './application-chat.controller';
import { ApplicationChatService } from './application-chat.service';
import { ApplicationChatSchema } from './dto/application-chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/dto/user.schema';
import { SharedService } from 'src/shared/shared.service';
import { AttachmentSchema } from 'src/attachments/dto/attachments.schema';
import { UniversityApplicationSchema } from 'src/university-applications/dto/university-applications.schema';
import { UniversityApplicationsService } from 'src/university-applications/university-applications.service';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ApplicationChat', schema: ApplicationChatSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Attachment', schema: AttachmentSchema },
      { name: 'UniversityApplication', schema: UniversityApplicationSchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
    ]),
  ],
  controllers: [ApplicationChatController],
  providers: [
    ApplicationChatService,
    SharedService,
    UniversityApplicationsService,
    AttachmentsService,
  ],
})
export class ApplicationChatModule {}
