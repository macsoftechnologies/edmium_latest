import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { IntakeDto } from './dto/intake.dto';
import { Model } from 'mongoose';
import { Intake } from './dto/intake.schema';
import { timeStamp } from 'console';

@Injectable()
export class IntakeService {
  constructor(@InjectModel('Intake') private intakeModel: Model<Intake>) {}

  /* Get All services */
  async getAllIntakes(): Promise<any> {
    try {
      let intakes = await this.intakeModel.find();
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: intakes,
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
  async updateIntake(id: string, intakeDto: IntakeDto) {
    try {
      let updateIntakeRes = await this.intakeModel.findByIdAndUpdate(
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
