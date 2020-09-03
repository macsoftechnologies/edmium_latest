import {
  Controller,
  HttpStatus,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateUniversityDto } from './dto/create-university.dto';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';
@Controller('university')
export class UniversityController {
  constructor(
    private readonly universityService: UniversityService,
    private sharedService: SharedService,
  ) {}

  /* Get All Universities */
  @Get()
  async getAllUniversities() {
    try {
      const response = await this.universityService.getAllUniversities();
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }

  /* Create University */
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImage', maxCount: 1 },
      { name: 'backgroundImage', maxCount: 1 },
    ]),
  )
  async createUniversity(
    @Body() body: CreateUniversityDto,
    @UploadedFiles() files,
  ) {
    console.log(files);
    console.log(body);
    try {
      const profileImage = await this.sharedService.uploadFileToAWSBucket(
        files.profileImage[0],
        'university/profile-images',
      );
      const backgroundImage = await this.sharedService.uploadFileToAWSBucket(
        files.backgroundImage[0],
        'university/background-images',
      );
      const response = await this.universityService.createUniversity({
        universityName: body.universityName,
        universityProfileImage: profileImage.Location,
        universityBackgroundImage: backgroundImage.Location,
      });
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }
}
