import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Reminders } from './dto/reminder.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateReminderDto } from './dto/reminder.dto';

@Injectable()
export class ReminderService {
  constructor(
    @InjectModel('Reminder')
    private reminderModel: Model<Reminders>,
  ) {}

  /* Create reminder */
  async create(createReminderDto: CreateReminderDto) {
    try {
      const createReminderRes = await this.reminderModel.create(
        createReminderDto,
      );
      console.log('createReminder', createReminderRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createReminderRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Update Reminder */
  async update(params: any, id) {
    try {
      const updateReminderRes = await this.reminderModel.updateOne(
        { _id: id },
        params,
      );
      console.log('updateReminderResp', updateReminderRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: updateReminderRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
