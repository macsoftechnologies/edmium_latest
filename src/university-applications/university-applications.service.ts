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

  // filterApplications
  async filterApplications(params: any): Promise<any> {
    try {
      console.log(params);
      let universityDetails = await this.universityApplicationModel
        .aggregate([
          { $match: { status: params.status } },
          {
            $lookup: {
              from: 'universitydetails',
              localField: 'universityDetails',
              foreignField: '_id',
              as: 'universityDetails',
            },
          },
          { $unwind: '$universityDetails' },
          {
            $match: {
              'universityDetails.course': params.course,
              'universityDetails.intake': params.intake,
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          { $unwind: '$user' },
        ])
        // .find({ user: params.user })
        // .populate({ path: 'user', model: this.userModel })
        // .populate({
        //   path: 'universityDetails',
        //   model: this.universityDetailsModel,
        // })
        .skip(params.start)
        .limit(params.limit);

      console.log(universityDetails);

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
}

// db.universityapplications.aggregate([
//   { "$match": { "status": "Application submitted to the Institution" }},
//  { "$lookup": {
//     "from": "universitydetails",
//     "localField": "universityDetails",
//     "foreignField": "_id",
//     "as": "details"
//   }},
//   { "$unwind": "$details" },
//   { "$match": { "details.course": "MRes Archaeology", "details.intake": " Sep" }},
// //   { "$addFields": { "university_name": { "$arrayElemAt": ["$details.concentration", 1] }}},
// //   { "$project": { "_id": 0 }}
// ])
