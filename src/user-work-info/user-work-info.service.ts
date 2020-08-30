import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWorkInfo } from './dto/user-work-info.schema';
import { UserWorkInfoDto } from './dto/user-work-info.dto';
import { APIResponse } from 'src/dto/api-response-dto';

@Injectable()
export class UserWorkInfoService {
  constructor(
    @InjectModel('UserWorkInfo')
    private userWorkInfoModel: Model<UserWorkInfo>,
  ) {}

  //   Add User Work Info
  async addUserWorkInfo(params: UserWorkInfoDto): Promise<any> {
    try {
      const data = await this.userWorkInfoModel.create(params);

      let response = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request Successful',
      };
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  //   Get User Work Info By userId
  async getUserWorkInfoByUserId(userId): Promise<any> {
    try {
      const data = await this.userWorkInfoModel.find({ userId: userId });

      return {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request Successful!',
      };
    } catch (error) {
      return error;
    }
  }

  //   Update User Work Info
  async updateUserWorkInfo(id: string, params: UserWorkInfoDto): Promise<any> {
    try {
      const data = await this.userWorkInfoModel.updateOne({ _id: id }, params);

      let response = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request Successful',
      };
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  //   Delete User Work Info
  async deleteUserWorkInfo(id: string): Promise<any> {
    try {
      const data = await this.userWorkInfoModel.deleteOne({ _id: id });

      let response = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request Successful',
      };
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }
}
