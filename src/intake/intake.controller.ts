import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { IntakeService } from './intake.service';
import { IntakeDto } from './dto/intake.dto';

@Controller('intake')
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  /* Get All intakes */
  @Get()
  async getAllIntakes() {
    try {
      const response = this.intakeService.getAllIntakes();
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
      return error;
    }
  }
}
