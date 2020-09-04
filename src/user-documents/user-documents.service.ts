import { Injectable, HttpStatus } from '@nestjs/common';
import { UserDocuments } from './dto/user-documents.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';

@Injectable()
export class UserDocumentsService {
  constructor(
    @InjectModel('UserDocuments')
    private userDocumentsModel: Model<UserDocuments>,
  ) {}
  // Add User Documents
  async addUserDocuments(params: any): Promise<any> {
    try {
      console.log(params);
      const userDocuments = await this.userDocumentsModel.findOne({
        userId: params.userId,
      });
      let data = {};
      if (userDocuments) {
        await this.userDocumentsModel.updateOne(
          { _id: userDocuments._id },
          params,
        );
        data = await this.userDocumentsModel.findById(userDocuments._id);
      } else {
        data = await this.userDocumentsModel.create(params);
      }
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Updated successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  //  Get User Documents
  async getUserDocuments(userId): Promise<any> {
    try {
      const data = await this.userDocumentsModel.findOne({ userId: userId });

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
