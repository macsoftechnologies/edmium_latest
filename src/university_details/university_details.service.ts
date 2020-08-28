import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityDetails } from './dto/university_details.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import {
  CollegeDto,
  GetCollegeDto,
  SearchUniversitiesByIntCourUniNameDto,
} from './dto/university_details.dto';
import { University } from 'src/university/dto/university.schema';
import { Country } from 'src/country/dto/country.schema';

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
      //   console.log(createStudent);
      const createStudentRes = await this.universityDetailsModel.create(
        colleges,
      );
      console.log(createStudentRes);
      let response = {
        statusCode: HttpStatus.OK,
        data: createStudentRes,
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

  /* Get Colleges */
  async getUniversityDetails(params: GetCollegeDto): Promise<any> {
    let sortObject = {};
    sortObject[params.orderBy] = parseInt(params.sortBy);
    try {
      let colleges = await this.universityDetailsModel
        .find({ university: params.university_id })
        .populate({ path: 'university', model: this.universityModel })
        .populate({ path: 'country', model: this.countryModel })
        .skip(parseInt(params.start))
        .limit(parseInt(params.limit))
        .sort(sortObject);
      //   console.log('countries list', colleges);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: colleges,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
