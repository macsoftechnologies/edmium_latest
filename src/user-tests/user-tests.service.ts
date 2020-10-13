import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { UserTestsDto } from './dto/user-tests.dto';
import { UserTests } from './dto/user-tests.schema';

@Injectable()
export class UserTestsService {
  constructor(
    @InjectModel('UserTests') private userTestsModel: Model<UserTests>,
  ) {}

  //   Add User Personal Info
  async addUserTests(params: UserTestsDto): Promise<any> {
    try {
      const userTests = await this.userTestsModel.findOne({
        userId: params.userId,
        isDeleted: false,
      });

      if (userTests) {
        await this.userTestsModel.updateOne({ _id: userTests._id }, params);
      } else {
        await this.userTestsModel.create(params);
      }
      let response = {
        statusCode: HttpStatus.OK,
        data: await this.userTestsModel.findOne({
          userId: params.userId,
          isDeleted: false,
        }),
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

  //   Get User Tests By User Id
  async getUserTestsByUserId(userId): Promise<any> {
    try {
      let data: any = await this.userTestsModel.findOne({
        userId: userId,
        isDeleted: false,
      });

      return {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request Successful!',
      };
    } catch (error) {
      return error;
    }
  }
}
