import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Concentration } from './dto/concentration.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateConcentrationDto } from './dto/concentration.dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class ConcentrationService {
  constructor(
    @InjectModel('Concentration')
    private concentrationModel: Model<Concentration>,
  ) {}

  /* Get all countries */
  async getAllConcentrations(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      let concentrationsCount = await this.concentrationModel
        .find({
          isDeleted: false,
          ...params.findObject,
        })
        .count();

      let concentrations = await this.concentrationModel
        .find({
          isDeleted: false,
          ...params.findObject,
        })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { concentrations, total_count: concentrationsCount },
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create concentration */
  async createConcentration(createConcentrationDto: CreateConcentrationDto) {
    try {
      const createConcentrationRes = await this.concentrationModel.create(
        createConcentrationDto,
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createConcentrationRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Update Concentration */
  async updateConcentration(params: any, id: string) {
    try {
      const updateConcentrationRes = await this.concentrationModel.updateOne(
        { _id: id },
        { $set: params },
      );
      console.log(updateConcentrationRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: updateConcentrationRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
