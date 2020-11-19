import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/reminder.dto';

@Controller('reminder')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  /* Create Reminder */
  @Post()
  async createReminder(@Body() createReminderDto: CreateReminderDto) {
    try {
      const createReminderResponse = this.reminderService.create(
        createReminderDto,
      );
      return createReminderResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  //   /* Update Reminder */
  //   @Put('/:id')
  //   async updateReminder(
  //     @Body() createReminderDto: CreateReminderDto,
  //     @Param('id') id: string,
  //   ) {
  //     try {
  //       const updateReminderResponse = this.reminderService.update(
  //         createReminderDto,
  //         id,
  //       );
  //       return updateReminderResponse;
  //     } catch (error) {
  //       return {
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         data: null,
  //         errorMessage: error.message,
  //       };
  //     }
  //   }

  //   /* Delete Reminder */
  //   @Delete('/:id')
  //   async deleteCourse(@Param('id') id: string) {
  //     try {
  //       const deleteReminderResponse = this.reminderService.update(
  //         { isDeleted: true },
  //         id,
  //       );
  //       return deleteReminderResponse;
  //     } catch (error) {
  //       return {
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         data: null,
  //         errorMessage: error.message,
  //       };
  //     }
  //   }
}
