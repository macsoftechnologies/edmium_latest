import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApplicationChatService } from './application-chat.service';
import { ApplicationChatDto } from './dto/application-chat.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';
import { UserAttachmentsService } from 'src/user-attachments/user-attachments.service';
import { UniversityApplicationsService } from 'src/university-applications/university-applications.service';

@Controller('application-chat')
export class ApplicationChatController {
  constructor(
    private applicationChatService: ApplicationChatService,
    private userAttachmentsService: UserAttachmentsService,
    private universityApplicationsService: UniversityApplicationsService,
    private sharedService: SharedService,
  ) {}

  //  Add Application Comment
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }]),
  )
  async addApplicationComment(
    @Body() body: ApplicationChatDto,
    @UploadedFiles() files,
  ) {
    try {
      const attachments = [];

      if (files.attachments) {
        const application = await this.universityApplicationsService.getApplicationById(
          body.application,
        );
        for (const attachment of files.attachments) {
          const res = await this.sharedService.uploadFileToAWSBucket(
            attachment,
            'university-application/chat',
          );

          const attachmentObject = await this.userAttachmentsService.addAttachment(
            {
              userId: application.user,
              attachment: res.Location,
              category: 'chat',
            },
          );

          attachments.push(attachmentObject.data._id);
        }
      }
      const params: any = body;
      params.attachments = attachments;
      const response = this.applicationChatService.addApplicationComment(
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  //    Get Application Chat
  @Get('/:applicationId')
  async getChatOfApplication(@Param('applicationId') applicationId: string) {
    try {
      const courses = await this.applicationChatService.getChatOfApplication(
        applicationId,
      );
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
