import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Education } from './dto/education.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateEducation } from './dto/create-education.dto';
import { promises } from 'dns';
import { create } from 'domain';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel('Education')
    private educationModel: Model<Education>,
  ) {}

  /* Get All Education Details from Database */
  async getAllEducations(): Promise<any> {
    try {
      const educationlist = await this.educationModel.find();
      let response: APIResponse = {
        statusCode: HttpStatus.OK,
        data: educationlist,
        message: 'Request Successfull!!!!',
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
}
