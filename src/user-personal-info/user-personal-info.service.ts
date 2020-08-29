import { Injectable, HttpStatus } from '@nestjs/common';
import { UserPersonalInfoDto } from './dto/user-personal-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPersonalInfo } from './dto/user-personal-info.schema';
import { APIResponse } from 'src/dto/api-response-dto';

@Injectable()
export class UserPersonalInfoService {
  constructor(
    @InjectModel('UserPersonalInfo')
    private userPersonalInfoModel: Model<UserPersonalInfo>,
  ) {}

  /* Create Education */
  async addUserPersonalInfo(params: UserPersonalInfoDto): Promise<any> {
    try {
      const userPersonalInfo = await this.userPersonalInfoModel.findOne({
        userId: params.userId,
      });
      let data = {};
      if (userPersonalInfo) {
        await this.userPersonalInfoModel.updateOne(
          { _id: userPersonalInfo._id },
          params,
        );
        data = await this.userPersonalInfoModel.findById(userPersonalInfo._id);
      } else {
        data = await this.userPersonalInfoModel.create(params);
      }
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

  //   Get User Personal Info By userId
  async getUserPersonalInfoByUserId(userId): Promise<any> {
    try {
      const data = await this.userPersonalInfoModel.findOne({ userId: userId });

      return {
        statusCode: HttpStatus.OK,
        data: data ? data : {},
        message: 'Request Successful!',
      };
    } catch (error) {
      return error;
    }
  }
}
