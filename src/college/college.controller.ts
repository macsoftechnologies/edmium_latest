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
import { CollegeService } from './college.service';
import { AddCollegeDto, CollegeDto, GetCollegeDto } from './dto/college.dto';
import { SharedService } from 'src/shared/shared.service';

@Controller('college')
export class CollegeController {
  constructor(
    private collegeService: CollegeService,
    private sharedService: SharedService,
  ) {}

  /* Add Colleges */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addColleges(@Body() body: AddCollegeDto, @UploadedFile() file) {
    try {
      const colleges: CollegeDto[] = await this.sharedService.excelToJSON(
        file.buffer,
      );
      colleges.map(college => {
        college.university = body.university;
        college.country = body.country;
      });
      let response = await this.collegeService.addColleges(colleges);
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
  async getColleges(@Query() params: GetCollegeDto) {
    try {
      const courses = await this.collegeService.getColleges(params);
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
