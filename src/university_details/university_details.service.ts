import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityDetails } from './dto/university_details.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import {
  CollegeDto,
  GetCollegeDto,
  SearchUniversitiesByIntCourUniNameDto,
  FilterByCourseDto,
} from './dto/university_details.dto';
import { University } from 'src/university/dto/university.schema';
import { Country } from 'src/country/dto/country.schema';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import * as _ from 'lodash';
import { ApplicationStatus } from 'src/application-status/dto/application-status.schema';

@Injectable()
export class UniversityDetailsService {
  constructor(
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
    @InjectModel('University') private universityModel: Model<University>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('ApplicationStatus')
    private applicationStatusModel: Model<ApplicationStatus>,
  ) {}

  /* Add Colleges */
  async postUniversityDetails(colleges: CollegeDto[]): Promise<any> {
    try {
      //   console.log(createUser);
      const createUserRes = await this.universityDetailsModel.create(colleges);
      console.log(createUserRes);
      let response = {
        statusCode: HttpStatus.OK,
        data: createUserRes,
        message: 'Colleges Added',
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

  /* Get University Details */
  async getUniversityDetails(params: FetchParamsDto): Promise<any> {
    try {
      console.log(params);
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      let universityDetailsCount = await this.universityDetailsModel
        .find({ isDeleted: false, ...params.findObject })
        .count();

      let universityDetails = await this.universityDetailsModel
        .find({ isDeleted: false, ...params.findObject })
        .populate({ path: 'university', model: this.universityModel })
        .populate({ path: 'country', model: this.countryModel })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { universityDetails, total_count: universityDetailsCount },
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Filter By Course
  async filterByCourse(params: FetchParamsDto): Promise<any> {
    try {
      console.log(params);
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      if (params.findObject.englishTest && params.findObject.englishTestValue) {
        params.findObject[
          params.findObject.englishTest.toLowerCase() + 'Min'
        ] = {
          $lte: params.findObject.englishTestValue,
        };
        params.findObject[
          params.findObject.englishTest.toLowerCase() + 'Max'
        ] = {
          $gte: params.findObject.englishTestValue,
        };

        delete params.findObject.englishTest;
        delete params.findObject.englishTestValue;
      }

      const feeMatch: any = {};
      if (params.findObject.fee && params.findObject.fee.length) {
        feeMatch['$or'] = [];
        params.findObject.fee.map((fee: any) => {
          const feeCondition = { $and: [] };
          if (fee.min)
            feeCondition.$and.push({ tuitionFee: { $gte: fee.min } });
          if (fee.max)
            feeCondition.$and.push({ tuitionFee: { $lte: fee.max } });
          feeMatch.$or.push(feeCondition);
        });
        delete params.findObject.fee;
      }

      const durationMatch: any = {};
      if (params.findObject.duration && params.findObject.duration.length) {
        durationMatch['$or'] = [];
        params.findObject.duration.map((duration: any) => {
          const durationCondition = { $and: [] };
          if (duration.min)
            durationCondition.$and.push({ duration: { $gte: duration.min } });
          if (duration.max)
            durationCondition.$and.push({ duration: { $lte: duration.max } });
          durationMatch.$or.push(durationCondition);
        });
        delete params.findObject.duration;
      }

      if (params.findObject.intake && params.findObject.intake.length) {
        params.findObject.intake = { $in: params.findObject.intake };
      }

      let universityDetailsCount = await this.universityDetailsModel.aggregate([
        { $match: params.findObject },
        { $match: feeMatch },
        { $match: durationMatch },
        {
          $addFields: {
            universityId: {
              $toObjectId: '$university',
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
        {
          $unwind: {
            path: '$university',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $addFields: {
            countryId: {
              $toObjectId: '$country',
            },
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'countryId',
            foreignField: '_id',
            as: 'country',
          },
        },
        {
          $unwind: {
            path: '$country',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $count: 'count',
        },
      ]);

      let universityDetails = await this.universityDetailsModel
        .aggregate([
          { $match: params.findObject },
          { $match: feeMatch },
          { $match: durationMatch },
          {
            $addFields: {
              universityId: {
                $toObjectId: '$university',
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
          {
            $unwind: {
              path: '$university',
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $addFields: {
              countryId: {
                $toObjectId: '$country',
              },
            },
          },
          {
            $lookup: {
              from: 'countries',
              localField: 'countryId',
              foreignField: '_id',
              as: 'country',
            },
          },
          {
            $unwind: {
              path: '$country',
              preserveNullAndEmptyArrays: true,
            },
          },
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
      return error;
    }
  }

  // Fetch Countries
  async fetchCountries(universityId: string): Promise<any> {
    try {
      let universityDetails = await this.universityDetailsModel
        .find({ university: universityId }, { country: 1 })
        .populate({ path: 'country', model: this.countryModel });

      const countries = universityDetails.map(
        (details: any) => details.country,
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: _.uniqBy(countries, '_id'),
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Fetch Countries
  async fetchSpecializations(concentration: string): Promise<any> {
    try {
      let universityDetails = await this.universityDetailsModel.find(
        { concentration: concentration },
        { specialization: 1 },
      );

      const specializations = universityDetails.map(
        (details: any) => details.specialization,
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: _.uniq(specializations),
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Fetch Campuses
  async getCampuses(universityId: string, countryId: string): Promise<any> {
    try {
      let universityDetails = await this.universityDetailsModel.findOne(
        { university: universityId, country: countryId },
        { campus: 1 },
      );

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data:
          universityDetails && universityDetails.campus
            ? universityDetails.campus
            : [],
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async getOne(params): Promise<any> {
    try {
      let universityDetails = await this.universityDetailsModel.findOne({
        isDeleted: false,
        ...params,
      });

      return universityDetails;
    } catch (error) {
      return error;
    }
  }

  async getApplicationsStatus(universityId: string, params: any): Promise<any> {
    try {
      const fromDateFilter = {};
      const toDateFilter = {};
      if (params.fromDate && params.toDate) {
        const toDate = new Date(params.toDate);
        toDate.setDate(toDate.getDate() + 1);

        fromDateFilter['applications.createdAt'] = {
          $gt: new Date(params.fromDate),
        };
        toDateFilter['applications.createdAt'] = {
          $lt: toDate,
        };
      }

      const response = await this.universityDetailsModel.aggregate([
        {
          $match: { university: universityId, isDeleted: false },
        },
        {
          $addFields: {
            universityDetailsId: {
              $toString: '$_id',
            },
          },
        },
        {
          $lookup: {
            from: 'universityapplications',
            localField: 'universityDetailsId',
            foreignField: 'universityDetails',
            as: 'applications',
          },
        },
        {
          $unwind: {
            path: '$applications',
          },
        },
        {
          $match: fromDateFilter,
        },
        {
          $match: toDateFilter,
        },
        {
          $addFields: {
            statusId: {
              $toObjectId: '$applications.status',
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
        {
          $unwind: {
            path: '$status',
          },
        },
        {
          $addFields: {
            parentStatusId: {
              $toObjectId: '$status.parentStatus',
            },
          },
        },
        {
          $lookup: {
            from: 'applicationstatuses',
            localField: 'parentStatusId',
            foreignField: '_id',
            as: 'parentStatus',
          },
        },
        {
          $unwind: {
            path: '$parentStatus',
          },
        },
      ]);

      const statusResponse: any[] = await this.applicationStatusModel
        .find({ isDeleted: false, isParentStatus: true })
        .select('status')
        .lean();

      statusResponse.map((res: any) => {
        res.count = 0;
      });

      response.map((res: any) => {
        const index = _.findIndex(
          statusResponse,
          status => {
            return status.status == res.parentStatus.status;
          },
          0,
        );
        statusResponse[index].count++;
      });

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: statusResponse,
        message: 'Request successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
