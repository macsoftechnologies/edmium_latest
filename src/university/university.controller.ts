import { Controller, HttpStatus, Get, Post, Body } from '@nestjs/common';
import { UniversityService } from './university.service';
import { APIReponse } from 'src/dto/api-response-dto';
import { CreateUniversityDto } from './dto/create-university.dto';
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  /* Get All Universities */
  @Get()
  async getAllUniversities() {
    try {
      const response = await this.universityService.getAllUniversities();
      return response;
    } catch (error) {
      const apiResponse: APIReponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }

  /* Create University */
  @Post()
  async createUniversity(@Body() createUniversityDto: CreateUniversityDto) {
    try {
      const response = await this.universityService.createUniversity(
        createUniversityDto,
      );
      return response;
    } catch (error) {
      const apiResponse: APIReponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }
}
