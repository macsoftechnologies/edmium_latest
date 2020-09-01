import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import {
  UniversityApplicationDto,
  ApplicationsOfStudentDto,
} from './dto/university-applications.dto';
import { UniversityApplicationsService } from './university-applications.service';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { UserService } from 'src/user/user.service';

@Controller('university-applications')
export class UniversityApplicationsController {
  constructor(
    private universityApplicationService: UniversityApplicationsService,
  ) {}

  //   Apply for University
  @Post()
  async addUniversityApplication(@Body() body: UniversityApplicationDto) {
    try {
      console.log(body);
      let response = await this.universityApplicationService.addUniversityApplication(
        body,
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
}
