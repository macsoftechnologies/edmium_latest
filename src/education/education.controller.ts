import {
  Controller,
  HttpStatus,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducation } from './dto/create-education.dto';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';

@Controller('education')
export class EducationController {
  constructor(
    private educationService: EducationService,
    private sharedService: SharedService,
  ) {}

  /* Get EducationList */
  @Post('/listing')
  async getAllEducations(@Body() body: PaginationDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      let response = await this.educationService.getAllEducations(params);
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

  /* Update new Education */
  @Put('/:id')
  async updateEducation(
    @Param('id') id: string,
    @Body() educationDto: CreateEducation,
  ) {
    try {
      let response = this.educationService.updateEducation(id, educationDto);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Delete Education */
  @Delete('/:id')
  async deleteCourse(@Param('id') id: string) {
    try {
      const deleteEducation = this.educationService.updateEducation(id, {
        isDeleted: true,
      });
      return deleteEducation;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
