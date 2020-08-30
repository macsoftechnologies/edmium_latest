import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserAcademicInfoDto } from './dto/user-academic-info.dto';
import { UserAcademicInfoService } from './user-academic-info.service';

@Controller('user-academic-info')
export class UserAcademicInfoController {
  constructor(private userAcademicInfoService: UserAcademicInfoService) {}

  //   Add User Academic Info
  @Post()
  async addUserAcademicInfo(@Body() body: UserAcademicInfoDto) {
    try {
      console.log(body);
      let response = await this.userAcademicInfoService.addUserAcademicInfo(
        body,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Get('/:userId')
  async getUserAcademicInfoByUserId(@Param('userId') userId: string) {
    try {
      let response = await this.userAcademicInfoService.getUserAcademicInfoByUserId(
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

  //   Update User Academic Info
  @Put('/:id')
  async updateUserAcademicInfo(
    @Param('id') id: string,
    @Body() body: UserAcademicInfoDto,
  ) {
    try {
      console.log(body);
      let response = await this.userAcademicInfoService.updateUserAcademicInfo(
        id,
        body,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  //   Delete User Academic Info
  @Delete('/:id')
  async deleteUserAcademicInfo(@Param('id') id: string) {
    try {
      let response = await this.userAcademicInfoService.deleteUserAcademicInfo(
        id,
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
