import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Concentration } from './dto/concentration.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateConcentrationDto } from './dto/concentration.dto';

@Injectable()
export class ConcentrationService {
  constructor(
    @InjectModel('Concentration')
    private concentrationModel: Model<Concentration>,
  ) {}

  /* Get all countries */
  async getAllConcentrations(): Promise<any> {
    try {
      let countriesList = await this.concentrationModel.find({
        isDeleted: false,
      });
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: countriesList,
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
  async updateConcentration(params: any, id) {
    try {
      const updateConcentrationRes = this.concentrationModel.updateOne(
        { _id: id },
        params,
      );
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
