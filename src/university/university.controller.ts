import {
  Controller,
  HttpStatus,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Param,
  Put,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { APIResponse } from 'src/dto/api-response-dto';
import {
  CreateUniversityDto,
  ListingUniversityDto,
  UpdateUniversityDto,
} from './dto/create-university.dto';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';
import { PaginationDto } from 'src/shared/dto/shared.dto';
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
      const params = await this.sharedService.prepareParams({});
      const response = await this.universityService.getAllUniversities(params);
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

  /* Get All Universities */
  @Post('/listing')
  async getUniversities(@Body() body: ListingUniversityDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const response = await this.universityService.getAllUniversities(params);
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
      let profileImage, backgroundImage;
      if (files.profileImage) {
        profileImage = await this.sharedService.uploadFileToAWSBucket(
          files.profileImage[0],
          'university/profile-images',
        );
      }
      if (files.backgroundImage) {
        backgroundImage = await this.sharedService.uploadFileToAWSBucket(
          files.backgroundImage[0],
          'university/background-images',
        );
      }
      const response = await this.universityService.createUniversity({
        universityName: body.universityName,
        universityProfileImage: profileImage ? profileImage.Location : null,
        universityBackgroundImage: backgroundImage
          ? backgroundImage.Location
          : null,
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

  /* Update University */
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImage', maxCount: 1 },
      { name: 'backgroundImage', maxCount: 1 },
    ]),
  )
  async updateUniversity(
    @Param('id') id: string,
    @Body() body: UpdateUniversityDto,
    @UploadedFiles() files,
  ) {
    console.log(files);
    console.log(body);
    try {
      let profileImage, backgroundImage;
      if (files.profileImage) {
        profileImage = await this.sharedService.uploadFileToAWSBucket(
          files.profileImage[0],
          'university/profile-images',
        );
      }
      if (files.backgroundImage) {
        backgroundImage = await this.sharedService.uploadFileToAWSBucket(
          files.backgroundImage[0],
          'university/background-images',
        );
      }

      const params: any = {};
      body.universityName
        ? (params.universityName = body.universityName)
        : null;
      profileImage && profileImage.Location
        ? (params.universityProfileImage = profileImage.Location)
        : null;
      backgroundImage && backgroundImage.Location
        ? (params.universityBackgroundImage = backgroundImage.Location)
        : null;

      const response = await this.universityService.updateUniversity(
        id,
        params,
      );
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

  // Get University Applications
  @Post('/applications/:id')
  async getUniversityApplications(
    @Param('id') id: string,
    @Body() body: PaginationDto,
  ) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const response = await this.universityService.getUniversityApplications(
        id,
        params,
      );
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
