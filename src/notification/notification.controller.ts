import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/notification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
  ) {}

  @ApiTags('Notifications')
  @Post('/listing/:user')
  async getNotifications(
    @Body() body: PaginationDto,
    @Param('user') user: string,
  ) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const response = await this.notificationService.getNotifications(
        params,
        user,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  @ApiTags('Notifications')
  @Post()
  async createNotification(@Body() body: CreateNotificationDto) {
    try {
      const params: any = {
        ...body,
      };
      params.notification.action = 'to-do';
      const response = await this.notificationService.create(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  @ApiTags('Notifications')
  @Put('/:id')
  async updateNotification(
    @Param('id') id: string,
    @Body() body: UpdateNotificationDto,
  ) {
    try {
      const response = await this.notificationService.update(id, body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  @ApiTags('Notifications')
  @Delete('/:id')
  async deleteNotification(@Param('id') id: string) {
    try {
      const response = await this.notificationService.update(id, {
        isDeleted: true,
      });
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
