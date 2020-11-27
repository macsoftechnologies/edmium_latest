import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
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

  async get(params: FetchParamsDto) {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const filterObject: any = { isDeleted: false };

      if (params.findObject.name) {
        filterObject.name = {
          $regex: '.*' + params.findObject.name + '.*',
          $options: 'i',
        };
      }

      if (params.findObject.countryId)
        filterObject.countryId = params.findObject.countryId;

      const attachmentsCount = await this.attachmentModel
        .find(filterObject)
        .count();
      const attachments = await this.attachmentModel
        .find(filterObject)
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: {
          attachments,
          total_count: attachmentsCount,
        },
        message: 'Request successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
