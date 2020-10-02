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

@Injectable()
export class UniversityDetailsService {
  constructor(
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
    @InjectModel('University') private universityModel: Model<University>,
    @InjectModel('Country') private countryModel: Model<Country>,
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
  async getUniversityDetails(params: GetCollegeDto): Promise<any> {
    try {
      let universityDetails = await this.universityDetailsModel
        .find({ university: params.universityId })
        .populate({ path: 'university', model: this.universityModel })
        .populate({ path: 'country', model: this.countryModel })
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

      let universityDetails = await this.universityDetailsModel
        .find({ isDeleted: false, ...params.findObject })
        .populate({ path: 'university', model: this.universityModel })
        .populate({ path: 'country', model: this.countryModel })
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit)
        .sort(sortObject);

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
