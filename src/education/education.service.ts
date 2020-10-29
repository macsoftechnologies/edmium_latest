import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Education } from './dto/education.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateEducation } from './dto/create-education.dto';
import { promises } from 'dns';
import { create } from 'domain';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel('Education')
    private educationModel: Model<Education>,
  ) {}

  /* Get All Education Details from Database */
  async getAllEducations(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const educationsCount = await this.educationModel
        .find({
          isDeleted: false,
          ...params.findObject,
        })
        .count();

      const educations = await this.educationModel
        .find({
          isDeleted: false,
          ...params.findObject,
        })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let response: APIResponse = {
        statusCode: HttpStatus.OK,
        data: {
          educations,
          total_count: educationsCount,
        },
        message: 'Request Successful',
      };
      return response;
    } catch (error) {
      return error;
    }
  }

  /* Get Education by ID */
  async getEducationInfoByID(id): Promise<any> {
    try {
      let found = await this.educationModel.findOne({ _id: id });
      //   console.log('foundddd', found);
      if (!found) {
        console.log(found);
        throw new NotFoundException(`No user found with this ${id} appId. `);
      }
      return {
        statusCode: HttpStatus.OK,
        data: found,
        message: 'Request Successful!',
      };
    } catch (error) {
      return error;
    }
  }

  /* Create Education */
  async createEducation(createEducation: CreateEducation): Promise<any> {
    try {
      console.log(createEducation);
      let education = {
        name: createEducation.name,
        description: createEducation.description,
      };
      const createEducationRes = await this.educationModel.create(education);
      console.log(createEducationRes);
      let response = {
        statusCode: HttpStatus.OK,
        data: createEducationRes,
        message: 'Request Successfull !!!!',
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

  /* Update Education */
  async updateEducation(id: string, educationDto: any) {
    try {
      let updateEducationRes = await this.educationModel.updateOne(
        { _id: id },
        educationDto,
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: updateEducationRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }
}
