import { Injectable, HttpStatus } from '@nestjs/common';
import {
  UniversityApplicationDto,
  ApplicationsOfStudentDto,
  UpdateStatusDto,
} from './dto/university-applications.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityApplication } from './dto/university-applications.schema';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { User } from 'src/user/dto/user.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { University } from 'src/university/dto/university.schema';
import { Country } from 'src/country/dto/country.schema';

@Injectable()
export class UniversityApplicationsService {
  constructor(
    @InjectModel('UniversityApplication')
    private universityApplicationModel: Model<UniversityApplication>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
    @InjectModel('University')
    private universityModel: Model<University>,
    @InjectModel('Country') private countryModel: Model<Country>,
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
          populate: [
            {
              path: 'university',
              model: this.universityModel,
            },
            {
              path: 'country',
              model: this.countryModel,
            },
          ],
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

  // filterApplications
  async filterApplications(params: any): Promise<any> {
    try {
      console.log(params);

      let match: any = {};
      let likeMatch = {};

      if (params.status) {
        match['status'] = params.status;
      }

      if (params.course) {
        match['universityDetails.course'] = params.course;
      }

      if (params.intake) {
        match['universityDetails.intake'] = params.intake;
      }

      if (params.searchString) {
        likeMatch['$or'] = [
          {
            'university.universityName': {
              $regex: '.*' + params.searchString + '.*',
              $options: 'i',
            },
          },
          {
            'user.firstName': {
              $regex: '.*' + params.searchString + '.*',
              $options: 'i',
            },
          },
          {
            'user.lastName': {
              $regex: '.*' + params.searchString + '.*',
              $options: 'i',
            },
          },
        ];
      }

      let universityDetails = await this.universityApplicationModel
        .aggregate([
          {
            $addFields: {
              universityDetailsId: {
                $toObjectId: '$universityDetails',
              },
            },
          },
          {
            $lookup: {
              from: 'universitydetails',
              localField: 'universityDetailsId',
              foreignField: '_id',
              as: 'universityDetails',
            },
          },
          { $unwind: '$universityDetails' },

          {
            $addFields: {
              universityId: {
                $toObjectId: '$universityDetails.university',
              },
            },
          },
          {
            $lookup: {
              from: 'universities',
              localField: 'universityId',
              foreignField: '_id',
              as: 'university',
            },
          },
          { $unwind: '$university' },
          {
            $addFields: {
              userId: {
                $toObjectId: '$user',
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          { $unwind: '$user' },
          {
            $match: match,
          },
          {
            $match: likeMatch,
          },
        ])
        .skip(params.start)
        .limit(params.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universityDetails,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async checkDuplicate(params: any): Promise<any> {
    return await this.universityApplicationModel.find(params).countDocuments();
  }

  async getMaxUniqueId(): Promise<any> {
    return await this.universityApplicationModel
      .find()
      .select('uniqueId')
      .sort({ uniqueId: -1 })
      .limit(1);
  }

  //   Update Status
  async updateStatus(id: string, params: UpdateStatusDto): Promise<any> {
    try {
      const data = await this.universityApplicationModel.updateOne(
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

  async getApplicationById(id: string): Promise<any> {
    return await this.universityApplicationModel.findById(id);
  }
}
