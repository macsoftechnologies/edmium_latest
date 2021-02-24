import {
  Controller,
  Get,
  HttpStatus,
  Body,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CourseService } from './course.service';
import { CreateCourseDto, GetCoursesDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private sharedService: SharedService,
  ) {}

  /* Get Courses */
  @Post('/fetchAll')
  async getCourses(@Body() body: GetCoursesDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      console.log(params);
      const courses = await this.courseService.getAllCourses(params);
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
