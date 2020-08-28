import { Injectable, HttpStatus } from '@nestjs/common';
import { Student } from './dto/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateStudent,
  StudentLogin,
  FavoriteListDto,
} from './dto/student.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { Education } from 'src/education/dto/education.schema';
import { Country } from 'src/country/dto/country.schema';
import { Course } from 'src/course/dto/course.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Education') private educationModel: Model<Education>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('Course') private courseModel: Model<Course>,
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
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

  /* Get university list based on  intake course and university */
  async getUniversitiesByIntakeCourseUniversity(
    searchUniversitiesByIntCourUniNameDto: SearchUniversitiesByIntCourUniNameDto,
  ) {
    try {
      console.log('req', searchUniversitiesByIntCourUniNameDto);
      let universities = await this.universityDetailsModel.find({
        university: searchUniversitiesByIntCourUniNameDto.university,
        course: searchUniversitiesByIntCourUniNameDto.course,
        intake: searchUniversitiesByIntCourUniNameDto.intake,
      });

      // console.log('universities', universities);
      let apiReponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universities,
        message: 'Request Successful!!!',
      };
      return apiReponse;
    } catch (error) {
      let errorApiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return errorApiResponse;
    }
  }

  // Add Favorite University
  async addFavoriteUniversity(params: FavoriteListDto): Promise<any> {
    try {
      await this.studentModel.updateOne(
        { _id: params.studentId },
        { $addToSet: { favoriteUniversities: params.universityId } },
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'University added to favorite list successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Remove Favorite University
  async removeFavoriteUniversity(params: FavoriteListDto): Promise<any> {
    try {
      await this.studentModel.updateOne(
        { _id: params.studentId },
        { $pull: { favoriteUniversities: params.universityId } },
      );
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'University removed from favorite list successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Get Favorite Universities
  async getFavoriteUniversities(id: string): Promise<any> {
    try {
      const studentData = await this.studentModel.findById(id).populate({
        path: 'favoriteUniversities',
        model: this.universityDetailsModel,
      });
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: studentData.favoriteUniversities,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
