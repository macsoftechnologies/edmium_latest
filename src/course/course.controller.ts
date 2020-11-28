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

  // /* Create Course */
  // @Post()
  // async createCourse(@Body() createCourseDto: CreateCourseDto) {
  //   try {
  //     const createCourseResponse = this.courseService.createCourse(
  //       createCourseDto,
  //     );
  //     return createCourseResponse;
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       data: null,
  //       errorMessage: error.message,
  //     };
  //   }
  // }

  // /* Update Course */
  // @Put('/:id')
  // async updateCourse(
  //   @Body() createCourseDto: CreateCourseDto,
  //   @Param('id') id: string,
  // ) {
  //   try {
  //     const updateCourseResponse = this.courseService.updateCourse(
  //       createCourseDto,
  //       id,
  //     );
  //     return updateCourseResponse;
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       data: null,
  //       errorMessage: error.message,
  //     };
  //   }
  // }

  // /* Delete Course */
  // @Delete('/:id')
  // async deleteCourse(@Param('id') id: string) {
  //   try {
  //     const deleteCourseResponse = this.courseService.updateCourse(
  //       { isDeleted: true },
  //       id,
  //     );
  //     return deleteCourseResponse;
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       data: null,
  //       errorMessage: error.message,
  //     };
  //   }
  // }
}
