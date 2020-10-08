import { Body, Controller, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

  constructor(private sharedService : SharedService , private notificationService : NotificationService){}


    @ApiTags('Notifications')
    @Post('/listing/:user')
    async getNotifications(@Body() body: PaginationDto , @Param('user') user:string) {
      try {
        const params = await this.sharedService.prepareParams(body);
        const response = await this.notificationService.getNotifications(params , user);
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
