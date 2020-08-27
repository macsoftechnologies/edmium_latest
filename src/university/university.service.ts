import { Injectable, HttpStatus } from '@nestjs/common';
import { University } from './dto/university.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateUniversityDto } from './dto/create-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('University')
    private universityModel: Model<University>,
  ) {}

  /* Get all universities */
  async getAllUniversities(): Promise<any> {
    try {
      let universities = await this.universityModel.find();
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universities,
        message: 'Request Successful!!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create University */
  async createUniversity(createUniversityDto: CreateUniversityDto) {
    try {
      const createUniversityRes = await this.universityModel.create(
        createUniversityDto,
      );
      console.log('create uni resp', createUniversityRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createUniversityRes,
        message: 'Request Successful!!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
