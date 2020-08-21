import { Controller, HttpStatus, Param, Get, Post, Body } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducation } from './dto/create-education.dto';

@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  /* Get EducationList */
  @Get()
  async getAllEducations() {
    try {
      let response = await this.educationService.getAllEducations();
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* Get EducationByID */
  @Get('/:id')
  async getEducationByID(@Param('id') id: string) {
    try {
      let response = await this.educationService.getEducationInfoByID(id);
      console.log(response);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
  /* Create Education  */
  @Post()
  async createEducation(@Body() createEducation: CreateEducation) {
    try {
      console.log(createEducation);
      let response = await this.educationService.createEducation(
        createEducation,
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
