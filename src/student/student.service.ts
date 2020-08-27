import { Injectable, HttpStatus } from '@nestjs/common';
import { Student } from './dto/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudent, StudentLogin } from './dto/student.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { Education } from 'src/education/dto/education.schema';
import { Country } from 'src/country/dto/country.schema';
import { Course } from 'src/course/dto/course.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Education') private educationModel: Model<Education>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('Course') private courseModel: Model<Course>,
  ) {}

  /* Create Education */
  async createStudent(createStudent: CreateStudent): Promise<any> {
    try {
      console.log(createStudent);
      const createStudentRes = await this.studentModel.create(createStudent);
      console.log(createStudentRes);
      let response = {
        statusCode: HttpStatus.OK,
        data: createStudentRes,
        message: 'Request Successful !!!!',
      };
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  /* Create Education */
  async studentLogIn(studentLogIn: StudentLogin): Promise<any> {
    try {
      console.log(studentLogIn);

      const student = await this.studentModel
        .findOne({
          emailAddress: studentLogIn.emailAddress,
          password: studentLogIn.password,
        })
        .populate({ path: 'education', model: this.educationModel })
        .populate({ path: 'country', model: this.countryModel })
        .populate({ path: 'course', model: this.courseModel });
      console.log(student);
      let response = {};
      if (student) {
        response = {
          statusCode: HttpStatus.OK,
          data: student,
          message: 'LogIn Successful',
        };
      } else {
        response = {
          statusCode: HttpStatus.NOT_FOUND,
          data: student,
          message: 'Invalid Credentials',
        };
      }
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }
}
