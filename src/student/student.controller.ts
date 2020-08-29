import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import {
  CreateStudent,
  StudentLogin,
  FavoriteListDto,
} from './dto/student.dto';
import { StudentService } from './student.service';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  /* Create Student  */
  @Post('/signUp')
  async createStudent(@Body() createStudent: CreateStudent) {
    try {
      console.log(createStudent);
      let response = await this.studentService.createStudent(createStudent);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* Student LogIn */
  @Post('/logIn')
  async studentLogIn(@Body() studentLogIn: StudentLogin) {
    try {
      console.log(studentLogIn);
      let response = await this.studentService.studentLogIn(studentLogIn);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* Search universities by intake , course, and university */
  @Post()
  async getUniversitiesByIntakeCourseUniversity(
    @Body()
    searchUniversitiesByIntCourUniNameDto: SearchUniversitiesByIntCourUniNameDto,
  ) {
    try {
      let universities = await this.studentService.getUniversitiesByIntakeCourseUniversity(
        searchUniversitiesByIntCourUniNameDto,
      );
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Add favorite University
  @Post('/addFavoriteUniversity')
  async addFavoriteUniversity(@Body() body: FavoriteListDto) {
    try {
      let universities = await this.studentService.addFavoriteUniversity(body);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Remove favorite University
  @Post('/removeFavoriteUniversity')
  async removeFavoriteUniversity(@Body() body: FavoriteListDto) {
    try {
      let universities = await this.studentService.removeFavoriteUniversity(
        body,
      );
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Get favorite Universities
  @Get('/favoriteUniversities/:id')
  async getFavoriteUniversities(@Param('id') id: string) {
    try {
      let universities = await this.studentService.getFavoriteUniversities(id);
      return universities;
    } catch (error) {
      return error;
    }
  }
}
