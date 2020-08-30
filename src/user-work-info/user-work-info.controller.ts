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
import { UserWorkInfoDto } from './dto/user-work-info.dto';
import { UserWorkInfoService } from './user-work-info.service';

@Controller('user-work-info')
export class UserWorkInfoController {
  constructor(private userWorkInfoService: UserWorkInfoService) {}

  //   Add User Work Info
  @Post()
  async addUserWorkInfo(@Body() body: UserWorkInfoDto) {
    try {
      console.log(body);
      let response = await this.userWorkInfoService.addUserWorkInfo(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Work Info
  @Get('/:userId')
  async getUserWorkInfoByUserId(@Param('userId') userId: string) {
    try {
      let response = await this.userWorkInfoService.getUserWorkInfoByUserId(
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

  //   Update User Work Info
  @Put('/:id')
  async updateUserWorkInfo(
    @Param('id') id: string,
    @Body() body: UserWorkInfoDto,
  ) {
    try {
      console.log(body);
      let response = await this.userWorkInfoService.updateUserWorkInfo(
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

  //   Delete User Work Info
  @Delete('/:id')
  async deleteUserWorkInfo(@Param('id') id: string) {
    try {
      let response = await this.userWorkInfoService.deleteUserWorkInfo(id);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
