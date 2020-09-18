import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCountryDto } from 'src/country/dto/create-country.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { ToDoDto } from './dto/to-do.dto';
import { ToDo } from './dto/to-do.schema';

@Injectable()
export class ToDoService {
  constructor(
    @InjectModel('ToDo')
    private toDoModel: Model<ToDo>,
  ) {}

  // Get ToDos of User
  async getUserToDos(counselorId: string): Promise<any> {
    try {
      let response = await this.toDoModel.find({
        user: counselorId,
        isDeleted: false,
      });
      console.log('countries list', response);
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

  // Add ToDo
  async addToDo(params: ToDoDto) {
    try {
      const response = await this.toDoModel.create(params);
      console.log('createCountry', response);
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
