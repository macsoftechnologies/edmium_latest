import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';
import { CommissionTransactionsService } from './commission-transactions.service';
import * as _ from 'lodash';

@Controller('commission-transactions')
export class CommissionTransactionsController {
  constructor(
    private commissionTransactionsService: CommissionTransactionsService,
    private sharedService: SharedService,
  ) {}

  // Get Commission Transactions
  @Post('/:agentId')
  async getCommissionTransactions(
    @Body() body: PaginationDto,
    @Param('agentId') agentId: string,
  ) {
    try {
      const bodyCopy: any = body;
      bodyCopy.agent = agentId;
      bodyCopy.isActualAmount = true;
      const params = await this.sharedService.prepareParams(bodyCopy);
      const commissions = await this.commissionTransactionsService.getAll(
        params,
      );
      return commissions;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  // Get Agent Commissions
  @Post('/getAgentCommissions/:agentId')
  async getCountries(@Param('agentId') agentId: string) {
    try {
      const commissions = await this.commissionTransactionsService.fetch({
        agent: agentId,
      });
      const actualCommissions = [];
      const estimatedCommissions = [];

      const userCommission = {};

      for (const commission of commissions) {
        if (commission.isActualAmount) actualCommissions.push(commission);
        if (commission.isEstimatedAmount) {
          if (userCommission[commission.user]) {
            if (userCommission[commission.user] < commission.commission) {
              userCommission[commission.user] = commission.commission;
              const index = _.findIndex(estimatedCommissions, {
                user: commission.user,
              });
              estimatedCommissions[index] = commission;
            }
          } else {
            userCommission[commission.user] = commission.commission;
            estimatedCommissions.push(commission);
          }
        }
      }

      const countryWiseCommissions = [];
      for (const commission of actualCommissions) {
        const index = _.findIndex(countryWiseCommissions, {
          country: commission.country.name,
        });
        if (index !== -1) {
          countryWiseCommissions[index].actualAmount += commission.commission;
        } else {
          countryWiseCommissions.push({
            country: commission.country.name,
            estimatedAmount: 0,
            actualAmount: commission.commission,
          });
        }
      }

      for (const commission of estimatedCommissions) {
        const index = _.findIndex(countryWiseCommissions, {
          country: commission.country.name,
        });
        if (index !== -1) {
          countryWiseCommissions[index].estimatedAmount +=
            commission.commission;
        } else {
          countryWiseCommissions.push({
            country: commission.country,
            estimatedAmount: commission.commission,
            actualAmount: 0,
          });
        }
      }

      return countryWiseCommissions;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
