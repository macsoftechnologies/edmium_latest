import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { Attachment } from './dto/attachments.schema';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel('Attachment')
    private attachmentModel: Model<Attachment>,
  ) {}

  //   Add Attachment
  async addAttachment(addAttachment: any) {
    try {
      const response = await this.attachmentModel.create(addAttachment);
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

  //   Get User Attachments
  async getAttachments(params: any) {
    try {
      const response = await this.attachmentModel.find({
        isDeleted: false,
        ...params,
      });
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
