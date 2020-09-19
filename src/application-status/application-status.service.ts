import { Injectable, HttpStatus } from '@nestjs/common';
import { ApplicationStatus } from './dto/application-status.schema';
import { ApplicationStatusDto } from './dto/application-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';

@Injectable()
export class ApplicationStatusService {
  constructor(
    @InjectModel('ApplicationStatus')
    private applicationStatusModel: Model<ApplicationStatus>,
  ) {}

  //  Add Application Status
  async addApplicationStatus(params: ApplicationStatusDto) {
    try {
      const response = await this.applicationStatusModel.create(params);
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

  async find(params: any) {
    try {
      const response = await this.applicationStatusModel.find({
        isDeleted: false,
        ...params,
      });
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

  async getAll() {
    try {
      const response = await this.applicationStatusModel.aggregate([
        {
          $match: { isParentStatus: true, isDeleted: false },
        },
        {
          $addFields: {
            statusId: {
              $toString: '$_id',
            },
          },
        },
        {
          $lookup: {
            from: 'applicationstatuses',
            localField: 'statusId',
            foreignField: 'parentStatus',
            as: 'childStatuses',
          },
        },
      ]);
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
