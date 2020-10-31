import { Injectable, HttpStatus } from '@nestjs/common';
import {
  UniversityApplicationDto,
  ApplicationsOfStudentDto,
  UpdateStatusDto,
  ApplicationsFilterDto,
} from './dto/university-applications.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UniversityApplication } from './dto/university-applications.schema';
import { FetchParamsDto, PaginationDto } from 'src/shared/dto/shared.dto';
import { User } from 'src/user/dto/user.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { University } from 'src/university/dto/university.schema';
import { Country } from 'src/country/dto/country.schema';
import { ApplicationStatus } from 'src/application-status/dto/application-status.schema';
import { CommissionTransactionsService } from 'src/commission-transactions/commission-transactions.service';
import { CommissionTransactionDto } from 'src/commission-transactions/dto/commission-transactions.dto';
import { CommissionTransactions } from 'src/commission-transactions/dto/commission-transactions.schema';

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
    @InjectModel('ApplicationStatus')
    private applicationStatusModel: Model<ApplicationStatus>,
  ) {}

  //   Add User Academic Info
  async addUniversityApplication(
    params: UniversityApplicationDto,
  ): Promise<any> {
    try {
      console.log('params', params);

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
        .populate({ path: 'status', model: this.applicationStatusModel })
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
        .populate({
          path: 'status',
          model: this.applicationStatusModel,
          populate: [
            {
              path: 'parentStatus',
              model: this.applicationStatusModel,
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

  // filterApplications
  async filterApplications(
    userId: string,
    params: FetchParamsDto,
  ): Promise<any> {
    try {
      console.log(params);

      const user = await this.userModel.findById(userId);

      let studentIds: string[] = [];

      if (user.role == 'team-lead') {
        const counselors = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: user.assignedTo,
            countries: { $in: user.countries },
            role: { $in: ['counselor'] },
          },
          { _id: 1 },
        );

        const counselorIds: string[] = counselors.map((counselor: any) => {
          return counselor._id;
        });

        counselorIds.push(userId);

        const students = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: { $in: counselorIds },
            role: 'student',
          },
          { _id: 1 },
        );

        studentIds = students.map((student: any) => {
          return student._id;
        });
      } else if (user.role == 'counselor') {
        const students = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: { $in: [userId] },
            role: 'student',
          },
          { _id: 1 },
        );

        studentIds = students.map((student: any) => {
          return student._id;
        });
      } else if (user.role == 'agent') {
        const counselors = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: userId,
            role: { $in: ['agent-team-lead', 'agent-counselor'] },
          },
          { _id: 1 },
        );

        const counselorIds: string[] = counselors.map((counselor: any) => {
          return counselor._id;
        });

        counselorIds.push(userId);

        const students = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: { $in: counselorIds },
            role: 'student',
          },
          { _id: 1 },
        );

        studentIds = students.map((student: any) => {
          return student._id;
        });
      } else if (user.role == 'agent-team-lead') {
        const counselors = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: user.assignedTo,
            countries: { $in: user.countries },
            role: { $in: ['agent-counselor'] },
          },
          { _id: 1 },
        );

        const counselorIds: string[] = counselors.map((counselor: any) => {
          return counselor._id;
        });

        counselorIds.push(userId);

        const students = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: { $in: counselorIds },
            role: 'student',
          },
          { _id: 1 },
        );

        studentIds = students.map((student: any) => {
          return student._id;
        });
      } else if (user.role == 'agent-counselor') {
        const students = await this.userModel.find(
          {
            isDeleted: false,
            assignedTo: { $in: [userId] },
            role: 'student',
          },
          { _id: 1 },
        );

        studentIds = students.map((student: any) => {
          return student._id;
        });
      }

      console.log(studentIds);

      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      console.log(sortObject);

      let intakeFilter: any = {};
      let searchFilter = {};
      let fromDateFilter = {};
      let toDateFilter = {};
      let statusFilter = {};
      let UniversityFilter = {};
      let userFilter = {};

      if (user.role != 'admin') {
        userFilter['user._id'] = {
          $in: studentIds,
        };
      }

      if (params.findObject.fromDate && params.findObject.toDate) {
        const toDate = new Date(params.findObject.toDate);
        toDate.setDate(toDate.getDate() + 1);

        fromDateFilter['createdAt'] = {
          $gt: new Date(params.findObject.fromDate),
        };
        toDateFilter['createdAt'] = {
          $lt: toDate,
        };
      }

      if (params.findObject.status) {
        statusFilter['status'] = {
          $in: params.findObject.status,
        };
      }

      if (params.findObject.university) {
        UniversityFilter['universityDetails.university'] = {
          $in: params.findObject.university,
        };
      }

      if (params.findObject.intake) {
        intakeFilter['universityDetails.intake'] = {
          $in: params.findObject.intake,
        };
      }

      if (params.findObject.searchString) {
        searchFilter['$or'] = [
          {
            'university.universityName': {
              $regex: '.*' + params.findObject.searchString + '.*',
              $options: 'i',
            },
          },
          {
            'user.firstName': {
              $regex: '.*' + params.findObject.searchString + '.*',
              $options: 'i',
            },
          },
          {
            'user.lastName': {
              $regex: '.*' + params.findObject.searchString + '.*',
              $options: 'i',
            },
          },
        ];
      }

      const universityDetailsCount = await this.universityApplicationModel.aggregate(
        [
          {
            $match: fromDateFilter,
          },
          {
            $match: toDateFilter,
          },
          {
            $match: statusFilter,
          },
          {
            $addFields: {
              statusId: {
                $toObjectId: '$status',
              },
            },
          },
          {
            $lookup: {
              from: 'applicationstatuses',
              localField: 'statusId',
              foreignField: '_id',
              as: 'status',
            },
          },
          { $unwind: '$status' },

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
            $match: UniversityFilter,
          },
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
            $match: userFilter,
          },
          {
            $match: intakeFilter,
          },
          {
            $match: searchFilter,
          },

          {
            $addFields: {
              userCreatedById: {
                $convert: {
                  input: '$user.createdBy',
                  to: 'objectId',
                  onError: null,
                },
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userCreatedById',
              foreignField: '_id',
              as: 'user.createdBy',
            },
          },
          { $unwind: '$user.createdBy' },
          {
            $count: 'count',
          },
        ],
      );

      let universityDetails = await this.universityApplicationModel
        .aggregate([
          {
            $match: fromDateFilter,
          },
          {
            $match: toDateFilter,
          },
          {
            $match: statusFilter,
          },
          {
            $addFields: {
              statusId: {
                $toObjectId: '$status',
              },
            },
          },
          {
            $lookup: {
              from: 'applicationstatuses',
              localField: 'statusId',
              foreignField: '_id',
              as: 'status',
            },
          },
          { $unwind: '$status' },

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
            $match: UniversityFilter,
          },
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
            $match: userFilter,
          },
          {
            $match: intakeFilter,
          },
          {
            $match: searchFilter,
          },

          {
            $addFields: {
              userCreatedById: {
                $convert: {
                  input: '$user.createdBy',
                  to: 'objectId',
                  onError: null,
                },
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userCreatedById',
              foreignField: '_id',
              as: 'user.createdBy',
            },
          },
          { $unwind: '$user.createdBy' },
        ])
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: {
          universityDetails,
          total_count:
            universityDetailsCount[0] && universityDetailsCount[0].count
              ? universityDetailsCount[0].count
              : 0,
        },
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async checkDuplicate(params: any): Promise<any> {
    return await this.universityApplicationModel
      .find({ isDeleted: false, ...params })
      .countDocuments();
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

      //

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

  async fetch(params: any): Promise<any> {
    return await this.universityApplicationModel.find({
      isDeleted: false,
      ...params,
    });
  }

  async getById(id: string): Promise<any> {
    return await this.universityApplicationModel
      .findById(id)
      .populate({ path: 'user', model: this.userModel })
      .populate({ path: 'status', model: this.applicationStatusModel })
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
      .populate({
        path: 'createdBy',
        model: this.userModel,
        retainNullValues: true,
      });
  }
}
