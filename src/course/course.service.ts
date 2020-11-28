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

      let coursesCount = await this.courseModel
        .find({ isDeleted: false, ...params.findObject })
        .count();

      let courses = await this.courseModel
        .find({ isDeleted: false, ...params.findObject })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { courses, total_count: coursesCount },
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

  /* Create course */
  async checkAndCreateCourse(params: CreateCourseDto) {
    try {
      let response = await this.courseModel.findOne(params);

      if (!response) {
        response = await this.courseModel.create(params);
      }
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
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
