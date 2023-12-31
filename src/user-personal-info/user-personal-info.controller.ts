import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';
import { UserPersonalInfoDto } from './dto/user-personal-info.dto';
import { UserPersonalInfoService } from './user-personal-info.service';

@Controller('user-personal-info')
export class UserPersonalInfoController {
  constructor(
    private userPersonalInfoService: UserPersonalInfoService,
    private updateProfilePercentService: UpdateProfilePercentService,
  ) {}

  /* Add User Personal Info  */
  @Post()
  async addUserPersonalInfo(@Body() body: UserPersonalInfoDto) {
    try {
      console.log(body);
      let response = await this.userPersonalInfoService.addUserPersonalInfo(
        body,
      );

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

  // Get User Personal Info
  @Get('/:userId')
  async getUserPersonalInfoByUserId(@Param('userId') userId: string) {
    try {
      let response = await this.userPersonalInfoService.getUserPersonalInfoByUserId(
        userId,
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
