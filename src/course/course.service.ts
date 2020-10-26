import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './dto/course.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateCourseDto, GetCoursesDto } from './dto/course.dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course')
    private courseModel: Model<Course>,
  ) {}

  /* Get all courses */
  async getAllCourses(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      let courseList = await this.courseModel
        .find({ isDeleted: false, ...params.findObject })
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit)
        .sort(sortObject);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: courseList,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create course */
  async createCourse(createCourseDto: CreateCourseDto): Promise<any> {
    try {
      const createCourseRes = await this.courseModel.create(createCourseDto);
      console.log('create', createCourseRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createCourseRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Update course */
  async updateCourse(params: any, id): Promise<any> {
    try {
      const found = this.courseModel.findOne({ _id: id });
      if (found) {
        const updateCourseRes = await this.courseModel.updateOne(
          { _id: id },
          params,
        );

        let apiResponse: APIResponse = {
          statusCode: HttpStatus.OK,
          data: updateCourseRes,
          message: 'Request Successful',
        };
        return apiResponse;
      } else {
        throw new NotFoundException(`There is no course map with id ${id} `);
      }
    } catch (error) {
      return error;
    }
  }
}
