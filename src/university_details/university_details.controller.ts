import {
  Controller,
  HttpStatus,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AddCollegeDto,
  CollegeDto,
  GetCollegeDto,
  SearchUniversitiesByIntCourUniNameDto,
  FilterByCourseDto,
  ApplicationsStatusDto,
} from './dto/university_details.dto';
import { SharedService } from 'src/shared/shared.service';
import { UniversityDetailsService } from './university_details.service';
import { APIResponse } from 'src/dto/api-response-dto';
import * as _ from 'lodash';
import { ConcentrationService } from 'src/concentration/concentration.service';
import { CourseService } from 'src/course/course.service';

@Controller('university_details')
export class UniversityDetailsController {
  constructor(
    private universityDetailsService: UniversityDetailsService,
    private concentrationService: ConcentrationService,
    private courseService: CourseService,
    private sharedService: SharedService,
  ) {}

  /* Add Colleges */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async postUniversityDetails(
    @Body() body: AddCollegeDto,
    @UploadedFile() file,
  ) {
    try {
      const colleges: any[] = await this.sharedService.excelToJSON(file.buffer);
      let concentrations = [],
        courses = [];

      colleges.map(college => {
        if (college.university) {
          college.university = body.university;
          college.country = body.country;
          college.campus = college.campus ? college.campus.split(',') : [];
          college.campus = college.campus.map((campus: string) =>
            campus.trim(),
          );
          college.intake = college.intake ? college.intake.split(',') : [];
          college.intake = college.intake.map((intake: string) =>
            intake.trim(),
          );

          concentrations.push({
            name: college.concentration,
            code: college.field,
          });
          courses.push({
            name: college.course,
            education: college.studyLevel,
            concentrationCode: college.field,
          });
        }
      });

      concentrations = _.uniqBy(concentrations, 'code');
      courses = _.uniqBy(courses, 'name');

      for (const concentration of concentrations) {
        const conResponse = await this.concentrationService.checkAndCreateConcentration(
          concentration,
        );
        concentration._id = conResponse.data._id.toString();
      }

      for (const course of courses) {
        const index = concentrations.findIndex(
          obj => obj.code === course.concentrationCode,
        );
        course.concentration = concentrations[index]._id;

        delete course.concentrationCode;

        const conResponse = await this.courseService.checkAndCreateCourse(
          course,
        );
        course._id = conResponse.data._id.toString();
      }

      let response = await this.universityDetailsService.postUniversityDetails(
        colleges,
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

  /* Get University Details */
  @Post('/listing')
  async getUniversityDetails(@Body() body: FilterByCourseDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const universities = await this.universityDetailsService.filterByCourse(
        params,
      );
      return universities;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Search universities by intake university name and course */
  // @Post()
  // async searchUniversitiesByIntakeUniCourse(
  //   @Body()
  //   searchUniversitiesByIntCourUniNameDto: SearchUniversitiesByIntCourUniNameDto,
  // ) {
  //   try {
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // Filter By Course
  @Post('/filterByCourse')
  async filterByCourse(@Body() body: FilterByCourseDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const courses = await this.universityDetailsService.filterByCourse(
        params,
      );
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Get Countries of Universities */
  @Get('/countries/:universityId')
  async getCountries(@Param('universityId') universityId: string) {
    try {
      const response = await this.universityDetailsService.fetchCountries(
        universityId,
      );
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }

  /* Get Countries of Universities */
  @Get('/specializations/:concentration')
  async getSpecializations(@Param('concentration') concentration: string) {
    try {
      const response = await this.universityDetailsService.fetchSpecializations(
        concentration,
      );
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }

  /* Get Countries of Universities */
  @Get('/campus/:universityId/:countryId')
  async getCampuses(
    @Param('universityId') universityId: string,
    @Param('countryId') countryId: string,
  ) {
    try {
      const response = await this.universityDetailsService.getCampuses(
        universityId,
        countryId,
      );
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }

  // Get Applications Status
  @Post('/applicationsStatus/:universityId')
  async getApplicationsStatus(
    @Param('universityId') universityId: string,
    @Body() body: ApplicationsStatusDto,
  ) {
    try {
      const response = await this.universityDetailsService.getApplicationsStatus(
        universityId,
        body,
      );
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }
}
