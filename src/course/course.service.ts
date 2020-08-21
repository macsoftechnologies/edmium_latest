import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './dto/course.schema';
import { APIReponse } from 'src/dto/api-response-dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course')
    private courseModel: Model<Course>,
  ) {}

  /* Get all courses */
  async getAllCourses(): Promise<any> {
    try {
      let courseList = await this.courseModel.find();
      console.log('courses', courseList);
      let apiResponse: APIReponse = {
        statusCode: HttpStatus.OK,
        data: courseList,
        message: 'Request Successfull !!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create country */
  async createCourse(createCourseDto: CreateCourseDto): Promise<any> {
    try {
      const createCourseRes = await this.courseModel.create(createCourseDto);
      console.log('create', createCourseRes);
      let apiResponse: APIReponse = {
        statusCode: HttpStatus.OK,
        data: createCourseRes,
        message: 'Request Successfull !!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
  /* Update Country */
  async updateCourse(createCourseDto: CreateCourseDto, id): Promise<any> {
    try {
      const found = this.courseModel.findOne({ _id: id });
      if (found) {
        const updateCourseRes = await this.courseModel.updateOne(
          { _id: id },
          createCourseDto,
        );
        console.log('update course', updateCourseRes);
        let apiResponse: APIReponse = {
          statusCode: HttpStatus.OK,
          data: updateCourseRes,
          message: 'Request Successfull !!!',
        };
        return apiResponse;
      } else {
        throw new NotFoundException(`There is no course map with id ${id} `);
      }
    } catch (error) {
      return error;
    }
  }
  /* Delete country */
  async deleteCourse(id): Promise<any> {
    try {
      const found = this.courseModel.findOne({ _id: id });
      if (found) {
        const deleteCourseRes = await this.courseModel.deleteOne({ _id: id });
        console.log('delete', deleteCourseRes);
        let apiResponse: APIReponse = {
          statusCode: HttpStatus.OK,
          data: deleteCourseRes,
          message: 'Request Successfull !!!',
        };
        return apiResponse;
      } else {
        throw new NotFoundException(`There is no country map with id ${id} `);
      }
    } catch (error) {
      return error;
    }
  }
}
