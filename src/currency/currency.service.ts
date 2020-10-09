import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import { CreateCurrencyDto } from './dto/currency.dto';
import { Currency } from './dto/currency.schema';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel('Currency')
    private currencyModel: Model<Currency>,
  ) {}

  /* Get all currencies */
  async getAllCurrencies(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      let currencyList = await this.currencyModel
        .find({ isDeleted: false, ...params.findObject })
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit)
        .sort(sortObject);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: currencyList,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create country */
  async createCurrency(createCurrencyDto: CreateCurrencyDto): Promise<any> {
    try {
      const createCurrencyRes = await this.currencyModel.create(
        createCurrencyDto,
      );
      console.log('create', createCurrencyRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createCurrencyRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Update Country */
  async updateCurrency(params: any, id): Promise<any> {
    try {
      const found = this.currencyModel.findOne({ _id: id });
      if (found) {
        const updateCurrencyRes = await this.currencyModel.updateOne(
          { _id: id },
          params,
        );

        let apiResponse: APIResponse = {
          statusCode: HttpStatus.OK,
          data: updateCurrencyRes,
          message: 'Request Successful',
        };
        return apiResponse;
      } else {
        throw new NotFoundException(`There is no currency map with id ${id} `);
      }
    } catch (error) {
      return error;
    }
  }
}
