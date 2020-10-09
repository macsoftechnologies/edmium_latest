import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(
    private readonly currencyService: CurrencyService,
    private sharedService: SharedService,
  ) {}

  /* Get Currencies */
  @Post('/fetchAll')
  async getCurrencies(@Body() body: PaginationDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      console.log(params);
      const currencies = await this.currencyService.getAllCurrencies(params);
      return currencies;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Create Currency */
  @Post()
  async createCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
    try {
      const createCurrencyResponse = this.currencyService.createCurrency(
        createCurrencyDto,
      );
      return createCurrencyResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Update Currency */
  @Put('/:id')
  async updateCurrency(
    @Body() createCurrencyDto: CreateCurrencyDto,
    @Param('id') id: string,
  ) {
    try {
      const updateCurrencyResponse = this.currencyService.updateCurrency(
        createCurrencyDto,
        id,
      );
      return updateCurrencyResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Delete Currency */
  @Delete('/:id')
  async deleteCurrency(@Param('id') id: string) {
    try {
      const deleteCurrencyResponse = this.currencyService.updateCurrency(
        { isDeleted: true },
        id,
      );
      return deleteCurrencyResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
