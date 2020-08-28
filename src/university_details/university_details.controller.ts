import {
  Controller,
  HttpStatus,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AddCollegeDto,
  CollegeDto,
  GetCollegeDto,
} from './dto/university_details.dto';
import { SharedService } from 'src/shared/shared.service';
import { UniversityDetailsService } from './university_details.service';

@Controller('university_details')
export class UniversityDetailsController {
  constructor(
    private collegeService: UniversityDetailsService,
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
      let response = await this.collegeService.postUniversityDetails(colleges);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Get Colleges */
  @Get()
  async getUniversityDetails(@Query() params: GetCollegeDto) {
    try {
      const courses = await this.collegeService.getUniversityDetails(params);
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
