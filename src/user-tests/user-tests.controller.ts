import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UserTestsDto } from './dto/user-tests.dto';
import { UserTestsService } from './user-tests.service';

@Controller('user-tests')
export class UserTestsController {
  constructor(private userTestsService: UserTestsService) {}

  // Add User Tests
  @Post()
  async addUserTests(@Body() body: UserTestsDto) {
    try {
      console.log(body);
      let response = await this.userTestsService.addUserTests(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Tests
  @Get('/:userId')
  async getUserTestsByUserId(@Param('userId') userId: string) {
    try {
      let response = await this.userTestsService.getUserTestsByUserId(userId);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
