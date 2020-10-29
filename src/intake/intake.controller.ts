import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { IntakeService } from './intake.service';
import { IntakeDto } from './dto/intake.dto';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';

@Controller('intake')
export class IntakeController {
  constructor(
    private readonly intakeService: IntakeService,
    private sharedService: SharedService,
  ) {}

  /* Get All intakes */
  @Post('/listing')
  async getAllIntakes(@Body() body: PaginationDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const response = this.intakeService.getAllIntakes(params);
      return response;
    } catch (error) {
      return error;
    }
  }

  /* Add New Intake */
  @Post()
  async postIntake(@Body() intakeDto: IntakeDto) {
    try {
      const response = this.intakeService.postIntake(intakeDto);
      return response;
    } catch (error) {
      return error;
    }
  }

  /* Update new Intake */
  @Put('/:id')
  async updateIntake(@Param('id') id: string, @Body() intakeDto: IntakeDto) {
    try {
      let response = this.intakeService.updateIntake(id, intakeDto);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Delete Intake */
  @Delete('/:id')
  async deleteCourse(@Param('id') id: string) {
    try {
      const deleteIntake = this.intakeService.updateIntake(id, {
        isDeleted: true,
      });
      return deleteIntake;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
