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
import { PaginationDto } from 'src/shared/dto/shared.dto';
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
    // @InjectModel('CommissionTransactions')
    // private CommissionTransactionsModel: Model<CommissionTransactions>,
    // private commissionTransactionsService: CommissionTransactionsService
  ) { }

  //   Add User Academic Info
  async addUniversityApplication(
    params: UniversityApplicationDto,
  ): Promise<any> {
    try {
      console.log('params', params);

      let user = params.user
      let universityDetailsId = params.universityDetails
      const data = await this.universityApplicationModel.create(params);

      // const beneficiaryUser = await this.userModel
      //                        .findOne({ _id: Types.ObjectId(user) }, { assignedTo: 1 }).lean()                       
      // const universityDetails =  await this.universityDetailsModel
      //                        .findOne({ _id: Types.ObjectId(universityDetailsId) })
                            //  .populate({
                            //   path: 'country',
                            //   model: this.countryModel,
                            //   retainNullValues: true,
                            // })
                         
    //  console.log('beneficiaryUser' , beneficiaryUser)
    //   console.log('universityDetails' , universityDetails)
    //   const countryId = universityDetails.country
    //   const estimatedAmount = parseInt( universityDetails.tuitionFee) * 2
    //   const CTobj: CommissionTransactionDto = {
    //     user: beneficiaryUser.assignedTo,
    //     applicationId: "data._id",
    //     countryId: countryId,
    //     estimatedAmount: estimatedAmount,
    //     actualAmount: 0
    //   }


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
  async filterApplications(params: ApplicationsFilterDto): Promise<any> {
    try {
      console.log(params);

      let intakeFilter: any = {};
      let searchFilter = {};
      let fromDateFilter = {};
      let toDateFilter = {};
      let statusFilter = {};
      let UniversityFilter = {};

      if (params.fromDate && params.toDate) {
        const toDate = new Date(params.toDate);
        toDate.setDate(toDate.getDate() + 1);

        fromDateFilter['createdAt'] = {
          $gt: new Date(params.fromDate),
        };
        toDateFilter['createdAt'] = {
          $lt: toDate,
        };
      }

      if (params.status) {
        statusFilter['status'] = {
          $in: params.status,
        };
      }

      if (params.university) {
        UniversityFilter['universityDetails.university'] = {
          $in: params.university,
        };
      }

      if (params.intake) {
        intakeFilter['universityDetails.intake'] = {
          $in: params.intake,
        };
      }

      if (params.searchString) {
        searchFilter['$or'] = [
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
            $match: intakeFilter,
          },
          {
            $match: searchFilter,
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
}
