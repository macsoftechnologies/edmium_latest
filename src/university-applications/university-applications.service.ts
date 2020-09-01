import { Injectable, HttpStatus } from '@nestjs/common';
import {
  UniversityApplicationDto,
  ApplicationsOfStudentDto,
} from './dto/university-applications.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityApplication } from './dto/university-applications.schema';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { User } from 'src/user/dto/user.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';

@Injectable()
export class UniversityApplicationsService {
  constructor(
    @InjectModel('UniversityApplication')
    private universityApplicationModel: Model<UniversityApplication>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
  ) {}

  //   Add User Academic Info
  async addUniversityApplication(
    params: UniversityApplicationDto,
  ): Promise<any> {
    try {
      const data = await this.universityApplicationModel.create(params);

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

  // Get All Applications
  async getAllApplications(params: PaginationDto): Promise<any> {
    try {
      let universityDetails = await this.universityApplicationModel
        .find()
        .populate({ path: 'user', model: this.userModel })
        .populate({
          path: 'universityDetails',
          model: this.universityDetailsModel,
        })
        .skip(params.start)
        .limit(params.limit);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universityDetails,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Get All Applications
  async getApplicationsOfStudent(
    params: ApplicationsOfStudentDto,
  ): Promise<any> {
    try {
      let universityDetails = await this.universityApplicationModel
        .find({ user: params.user })
        .populate({ path: 'user', model: this.userModel })
        .populate({
          path: 'universityDetails',
          model: this.universityDetailsModel,
        })
        .skip(params.start)
        .limit(params.limit);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universityDetails,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
