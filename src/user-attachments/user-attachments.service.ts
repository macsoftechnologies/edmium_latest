import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { UserAttachment } from './dto/user-attachments.schema';

@Injectable()
export class UserAttachmentsService {
  constructor(
    @InjectModel('UserAttachment')
    private userAttachmentModel: Model<UserAttachment>,
  ) {}

  //   Add Attachment
  async addAttachment(addAttachment: any) {
    try {
      const response = await this.userAttachmentModel.create(addAttachment);
      console.log('addAttachment', response);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  //   Fetch All
  async fetchAll(userId: string) {
    try {
      const response = await this.userAttachmentModel.find({ userId: userId });
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
