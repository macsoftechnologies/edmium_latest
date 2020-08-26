import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CreateStudent, StudentLogin } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  /* Create Student  */
  @Post('/signUp')
  async createStudent(@Body() createStudent: CreateStudent) {
    try {
      console.log(createStudent);
      let response = await this.studentService.createStudent(
        createStudent,
      );
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
      let response = await this.studentService.studentLogIn(
        studentLogIn,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
