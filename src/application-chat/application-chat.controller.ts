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
import { AttachmentsService } from 'src/attachments/attachments.service';
import { UniversityApplicationsService } from 'src/university-applications/university-applications.service';
import { NotificationService } from 'src/notification/notification.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/dto/user.schema';

@Controller('application-chat')
export class ApplicationChatController {
  constructor(
    private applicationChatService: ApplicationChatService,
    private attachmentsService: AttachmentsService,
    private universityApplicationsService: UniversityApplicationsService,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    @InjectModel('User') private userModel: Model<User>,
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

      const application = await this.universityApplicationsService.getById(
        body.application,
      );
      // console.log(application);
      if (files && files.attachments) {
        for (const attachment of files.attachments) {
          const res = await this.sharedService.uploadFileToAWSBucket(
            attachment,
            'university-application/chat',
          );

          const attachmentObject = await this.attachmentsService.addAttachment({
            userId: application.user._id,
            attachment: res.Location,
            category: 'chat',
          });

          attachments.push(attachmentObject.data._id);
        }
      }
      const params: any = body;
      params.attachments = attachments;
      const response = this.applicationChatService.addApplicationComment(
        params,
      );

      let usersTo = [application.user._id];
      let user;

      if (body.user == application.user._id.toString()) {
        usersTo = [application.user.assignedTo];
        user = application.user;
      } else {
        user = await this.userModel.findOne({
          _id: application.user.assignedTo,
        });
      }
      const notificationObj = {
        usersTo: usersTo,
        notification: {
          action: 'application-chat',
          title: 'Received a new comment',
          body: `${user.firstName} ${user.lastName} added a comment on a application of ${application.universityDetails.university.universityName}`,
          actionId: body.application,
        },
      };

      await this.notificationService.sendNotifications(notificationObj);

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
