import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ConcentrationService } from './concentration.service';
import { CreateConcentrationDto } from './dto/concentration.dto';

@Controller('concentration')
export class ConcentrationController {
  constructor(private concentrationService: ConcentrationService) {}

  /* Get Concentrations */
  @Get()
  async getConcentrations() {
    try {
      const courses = await this.concentrationService.getAllConcentrations();
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Create Concentration */
  @Post()
  async createConcentration(
    @Body() createConcentrationDto: CreateConcentrationDto,
  ) {
    try {
      const createConcentrationResponse = this.concentrationService.createConcentration(
        createConcentrationDto,
      );
      return createConcentrationResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
  /* Update Concentration */
  @Put('/:id')
  async updateConcentration(
    @Body() createConcentrationDto: CreateConcentrationDto,
    @Param('id') id: string,
  ) {
    try {
      const updateConcentrationResponse = this.concentrationService.updateConcentration(
        createConcentrationDto,
        id,
      );
      return updateConcentrationResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
  /* Delete Concentration */
  @Delete('/:id')
  async deleteCourse(@Param('id') id: string) {
    try {
      const deleteConcentrationResponse = this.concentrationService.updateConcentration(
        { isDeleted: true },
        id,
      );
      return deleteConcentrationResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
