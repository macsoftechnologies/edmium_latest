import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { IntakeDto } from './dto/intake.dto';
import { Model } from 'mongoose';
import { Intake } from './dto/intake.schema';
import { timeStamp } from 'console';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class IntakeService {
  constructor(@InjectModel('Intake') private intakeModel: Model<Intake>) {}

  /* Get All services */
  async getAllIntakes(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const intakeCount = await this.intakeModel
        .find({ isDeleted: false, ...params.findObject })
        .count();

      let intakes = await this.intakeModel
        .find({ isDeleted: false, ...params.findObject })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: {
          intakes,
          total_count: intakeCount,
        },
        message: 'Request Successful!!!',
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
  /* Add New Intake */
  async postIntake(createIntakeDto: IntakeDto) {
    try {
      let createIntakeRes = await this.intakeModel.create(createIntakeDto);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createIntakeRes,
        message: 'Request Successful!!!',
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
  /* Update Intake */
  async updateIntake(id: string, intakeDto: any) {
    try {
      let updateIntakeRes = await this.intakeModel.updateOne(
        { _id: id },
        intakeDto,
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: updateIntakeRes,
        message: 'Request Successful!!!',
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
