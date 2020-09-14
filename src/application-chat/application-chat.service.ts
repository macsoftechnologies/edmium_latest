import { Injectable, HttpStatus } from '@nestjs/common';
import { ApplicationChat } from './dto/application-chat.schema';
import { ApplicationChatDto } from './dto/application-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { User } from 'src/user/dto/user.schema';
import { UserAttachment } from 'src/user-attachments/dto/user-attachments.schema';

@Injectable()
export class ApplicationChatService {
  constructor(
    @InjectModel('ApplicationChat')
    private applicationChatModel: Model<ApplicationChat>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('UserAttachment')
    private userAttachmentModel: Model<UserAttachment>,
  ) {}

  //  Add Application Status
  async addApplicationComment(params: ApplicationChatDto) {
    try {
      const response = await this.applicationChatModel.create(params);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful !!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async getChatOfApplication(applicationId: string) {
    try {
      const response = await this.applicationChatModel
        .find({
          application: applicationId,
        })
        .populate({ path: 'attachments', model: this.userAttachmentModel });
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful !!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
