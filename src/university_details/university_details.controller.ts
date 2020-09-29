import {
  Controller,
  HttpStatus,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
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
      const colleges: CollegeDto[] = await this.sharedService.excelToJSON(
        file.buffer,
      );
      colleges.map(college => {
        college.university = body.university;
        college.country = body.country;
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

  /* Get University Details */
  @Post('/listing')
  async getUniversityDetails(@Body() params: GetCollegeDto) {
    try {
      const universities = await this.universityDetailsService.getUniversityDetails(
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
  @Post()
  async searchUniversitiesByIntakeUniCourse(
    @Body()
    searchUniversitiesByIntCourUniNameDto: SearchUniversitiesByIntCourUniNameDto,
  ) {
    try {
    } catch (error) {
      return error;
    }
  }

  // Filter By Course
  @Post('/filterByCourse')
  async filterByCourse(@Body() params: FilterByCourseDto) {
    try {
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
}
