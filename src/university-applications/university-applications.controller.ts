import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import {
  UniversityApplicationDto,
  ApplicationsOfStudentDto,
  UpdateStatusDto,
  ApplicationsFilterDto,
} from './dto/university-applications.dto';
import { UniversityApplicationsService } from './university-applications.service';
import { PaginationDto } from 'src/shared/dto/shared.dto';

import moment = require('moment');
import { ApplicationStatusService } from 'src/application-status/application-status.service';
var mongoose = require('mongoose');

@Controller('university-applications')
export class UniversityApplicationsController {
  constructor(
    private universityApplicationService: UniversityApplicationsService,
    private applicationStatusService: ApplicationStatusService,
  ) {}

  //   Apply for University
  @Post()
  async addUniversityApplication(@Body() body: UniversityApplicationDto) {
    try {
      console.log(body);

      if ((await this.universityApplicationService.checkDuplicate(body)) > 0) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessage: 'You have already applied to this University',
        };
      }
      const params: any = body;
      const maxUniqueId = await this.universityApplicationService.getMaxUniqueId();
      if (maxUniqueId.length > 0) {
        params.uniqueId = ++maxUniqueId[0].uniqueId;
      }
      const currentYear = moment().year();
      const nextYear = currentYear + 1;
      params.year =
        currentYear.toString().substring(2, 4) +
        '-' +
        nextYear.toString().substring(2, 4);

      params.universityDetails = mongoose.Types.ObjectId(
        params.universityDetails,
      );
      // params.user = mongoose.Types.ObjectId(params.user);

      const status = await this.applicationStatusService.find({
        isDefault: true,
      });

      console.log(status);

      if (status.data && status.data[0] && status.data[0]._id)
        params.status = status.data[0]._id;
      let response = await this.universityApplicationService.addUniversityApplication(
        params,
      );

      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Post('/listing')
  async getAllApplications(@Body() params: PaginationDto) {
    try {
      let response = await this.universityApplicationService.getAllApplications(
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Post('/filter-by-user')
  async getApplicationsOfStudent(@Body() params: ApplicationsOfStudentDto) {
    try {
      let response = await this.universityApplicationService.getApplicationsOfStudent(
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Post('/filter-by-criteria')
  async filterApplications(@Body() params: ApplicationsFilterDto) {
    try {
      let response = await this.universityApplicationService.filterApplications(
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Update Status
  @Post('/status/:id')
  async updateStatus(@Body() params: UpdateStatusDto, @Param('id') id: string) {
    try {
      let response = await this.universityApplicationService.updateStatus(
        id,
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
