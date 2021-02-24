import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { GetSpecializationsDto } from './dto/specialization.dto';
import { SpecializationService } from './specialization.service';

@Controller('specialization')
export class SpecializationController {
  constructor(
    private readonly specializationService: SpecializationService,
    private sharedService: SharedService,
  ) {}

  /* Get Specializations */
  @Post('/fetchAll')
  async getSpecializations(@Body() body: GetSpecializationsDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      console.log(params);
      const specializations = await this.specializationService.getAllSpecializations(
        params,
      );
      return specializations;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
