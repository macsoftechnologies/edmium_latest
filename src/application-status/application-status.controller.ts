import { Controller, Post, Body, HttpStatus, Get } from '@nestjs/common';
import { ApplicationStatusService } from './application-status.service';
import { ApplicationStatusDto } from './dto/application-status.dto';

@Controller('application-status')
export class ApplicationStatusController {
  constructor(private applicationStatusService: ApplicationStatusService) {}

  //  Add Application Status
  @Post()
  async addApplicationStatus(@Body() body: ApplicationStatusDto) {
    try {
      const response = this.applicationStatusService.addApplicationStatus(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  //    Get Application Status
  @Get()
  async getAll() {
    try {
      return await this.applicationStatusService.getAll({
        isParentStatus: false,
      });
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
