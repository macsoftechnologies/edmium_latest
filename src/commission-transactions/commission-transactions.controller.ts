import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';
import { CommissionTransactionsService } from './commission-transactions.service';

@Controller('commission-transactions')
export class CommissionTransactionsController {
  constructor(
    private commissionTransactionsService: CommissionTransactionsService,
    private sharedService: SharedService,
  ) {}

  /* Get Countries */
  @Post('/:agentId')
  async getCountries(
    @Body() body: PaginationDto,
    @Param('agentId') agentId: string,
  ) {
    try {
      const bodyCopy: any = body;
      bodyCopy.agent = agentId;
      bodyCopy.isActualAmount = true;
      const params = await this.sharedService.prepareParams(bodyCopy);
      const courses = await this.commissionTransactionsService.getAll(params);
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
