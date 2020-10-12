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
} from './dto/university_details.dto';
import { SharedService } from 'src/shared/shared.service';
import { UniversityDetailsService } from './university_details.service';
import { APIResponse } from 'src/dto/api-response-dto';

@Controller('university_details')
export class UniversityDetailsController {
  constructor(
    private universityDetailsService: UniversityDetailsService,
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
      colleges.map(college => {
        college.university = body.university;
        college.country = body.country;
        college.campus = college.campus.split(',');
        college.campus = college.campus.map((campus: string) => campus.trim());
        college.intake = college.intake.split(',');
        college.intake = college.intake.map((intake: string) => intake.trim());
      });
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

  // /* Get University Details */
  // @Post('/listing')
  // async getUniversityDetails(@Body() body: GetCollegeDto) {
  //   try {
  //     const params = await this.sharedService.prepareParams(body);
  //     const universities = await this.universityDetailsService.getUniversityDetails(
  //       params,
  //     );
  //     return universities;
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       data: null,
  //       errorMessage: error.message,
  //     };
  //   }
  // }

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
}
