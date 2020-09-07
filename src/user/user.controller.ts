import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  CreateUser,
  UserLogin,
  FavoriteListDto,
  FilterStudentsDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private sharedService: SharedService,
  ) {}

  /* Create User  */
  @Post('/signUp')
  async createUser(@Body() createUser: CreateUser) {
    try {
      console.log(createUser);
      let response = await this.userService.createUser(createUser);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* User LogIn */
  @Post('/logIn')
  async userLogIn(@Body() userLogIn: UserLogin) {
    try {
      console.log(userLogIn);
      let response = await this.userService.userLogIn(userLogIn);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Profile Image
  @Post('/profileImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addProfileImage(@UploadedFile() file, @Param('id') id: string) {
    try {
      const profileImage = await this.sharedService.uploadFileToAWSBucket(
        file,
        'user/profile-image',
      );
      const response = await this.userService.updateUser(id, {
        profileImage: profileImage.Location,
      });
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
      let universities = await this.userService.getUniversitiesByIntakeCourseUniversity(
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
      let universities = await this.userService.addFavoriteUniversity(body);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Remove favorite University
  @Post('/removeFavoriteUniversity')
  async removeFavoriteUniversity(@Body() body: FavoriteListDto) {
    try {
      let universities = await this.userService.removeFavoriteUniversity(body);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Get favorite Universities
  @Get('/favoriteUniversities/:id')
  async getFavoriteUniversities(@Param('id') id: string) {
    try {
      let universities = await this.userService.getFavoriteUniversities(id);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Filter students
  @Post('/filter-by-criteria')
  async filterStudents(@Body() params: FilterStudentsDto) {
    try {
      let response = await this.userService.filterStudents(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
