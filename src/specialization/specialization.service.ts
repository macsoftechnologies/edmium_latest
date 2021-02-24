import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import { CreateSpecializationDto } from './dto/specialization.dto';
import { Specialization } from './dto/specialization.schema';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectModel('Specialization')
    private specializationModel: Model<Specialization>,
  ) {}

  /* Get all specializations */
  async getAllSpecializations(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      let specializationsCount = await this.specializationModel
        .find({ isDeleted: false, ...params.findObject })
        .count();

      let specializations = await this.specializationModel
        .find({ isDeleted: false, ...params.findObject })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { specializations, total_count: specializationsCount },
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create specialization */
  async checkAndCreateSpecialization(params: CreateSpecializationDto) {
    try {
      let response = await this.specializationModel.findOne(params);

      if (!response) {
        response = await this.specializationModel.create(params);
      }
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
