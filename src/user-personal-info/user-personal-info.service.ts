import { Injectable, HttpStatus } from '@nestjs/common';
import { UserPersonalInfoDto } from './dto/user-personal-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPersonalInfo } from './dto/user-personal-info.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import { User } from 'src/user/dto/user.schema';

@Injectable()
export class UserPersonalInfoService {
  constructor(
    @InjectModel('UserPersonalInfo')
    private userPersonalInfoModel: Model<UserPersonalInfo>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  //   Add User Personal Info
  async addUserPersonalInfo(params: UserPersonalInfoDto): Promise<any> {
    try {
      let updateUserData = false,
        userData: any = {};

      if (params.firstName) {
        userData.firstName = params.firstName;
        updateUserData = true;
      }

      if (params.lastName) {
        userData.lastName = params.lastName;
        updateUserData = true;
      }

      if (params.emailAddress) {
        userData.emailAddress = params.emailAddress;
        updateUserData = true;
      }

      if (params.mobileNumber) {
        userData.mobileNumber = params.mobileNumber;
        updateUserData = true;
      }

      if (updateUserData) {
        await this.userModel.update({ _id: params.userId }, userData);
      }

      const userPersonalInfo = await this.userPersonalInfoModel.findOne({
        userId: params.userId,
      });

      if (userPersonalInfo) {
        await this.userPersonalInfoModel.updateOne(
          { _id: userPersonalInfo._id },
          params,
        );
      } else {
        await this.userPersonalInfoModel.create(params);
      }
      let response = {
        statusCode: HttpStatus.OK,
        data: await this.getUserPersonalInfoByUserId(params.userId),
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
      const data: any = await this.userPersonalInfoModel
        .findOne({ userId: userId })
        .populate({
          path: 'userId',
          model: this.userModel,
          select:
            '_id firstName lastName emailAddress mobileNumber profileImage',
        })
        .lean();

      if (data && data.userId) {
        data.firstName = data.userId.firstName;
        data.lastName = data.userId.lastName;
        data.emailAddress = data.userId.emailAddress;
        data.mobileNumber = data.userId.mobileNumber;
        data.profileImage = data.userId.profileImage;
        data.userId = data.userId._id;
      }

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
