import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAcademicInfo } from './dto/user-academic-info.schema';
import { UserAcademicInfoDto } from './dto/user-academic-info.dto';
import { APIResponse } from 'src/dto/api-response-dto';

@Injectable()
export class UserAcademicInfoService {
  constructor(
    @InjectModel('UserAcademicInfo')
    private userAcademicInfoModel: Model<UserAcademicInfo>,
  ) {}

  //   Add User Academic Info
  async addUserAcademicInfo(params: UserAcademicInfoDto): Promise<any> {
    try {
      const data = await this.userAcademicInfoModel.create(params);

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

  //   Get User Academic Info By userId
  async getUserAcademicInfoByUserId(userId): Promise<any> {
    try {
      const data = await this.userAcademicInfoModel.find({ userId: userId });

      return {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request Successful!',
      };
    } catch (error) {
      return error;
    }
  }

  //   Update User Academic Info
  async updateUserAcademicInfo(
    id: string,
    params: UserAcademicInfoDto,
  ): Promise<any> {
    try {
      const data = await this.userAcademicInfoModel.updateOne(
        { _id: id },
        params,
      );

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

  //   Delete User Academic Info
  async deleteUserAcademicInfo(id: string): Promise<any> {
    try {
      const data = await this.userAcademicInfoModel.deleteOne({ _id: id });

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
