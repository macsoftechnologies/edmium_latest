import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';
import { UserTestsDto } from './dto/user-tests.dto';
import { UserTestsService } from './user-tests.service';

@Controller('user-tests')
export class UserTestsController {
  constructor(
    private userTestsService: UserTestsService,
    private updateProfilePercentService: UpdateProfilePercentService,
  ) {}

  // Add User Tests
  @Post()
  async addUserTests(@Body() body: UserTestsDto) {
    try {
      console.log(body);
      let response = await this.userTestsService.addUserTests(body);

      await this.updateProfilePercentService.updateProfileCompletionPercentage(
        body.userId,
      );

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
