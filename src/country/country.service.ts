import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Country } from './dto/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { Currency } from 'src/currency/dto/currency.schema';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country')
    private countryModel: Model<Country>,
    @InjectModel('Currency')
    private currencyModel: Model<Currency>,
  ) {}

  /* Get all countries */
  async getAllCountries(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      let countriesCount = await this.countryModel
        .find({ isDeleted: false, ...params.findObject })
        .count();

      let countries = await this.countryModel
        .find({ isDeleted: false, ...params.findObject })
        .populate({
          path: 'currency',
          model: this.currencyModel,
          retainNullValues: true,
        })
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit)
        .sort(sortObject);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { countries, total_count: countriesCount },
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create country */
  async createCountry(createCountryDto: CreateCountryDto) {
    try {
      const createCountryRes = await this.countryModel.create(createCountryDto);
      console.log('createCountry', createCountryRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createCountryRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Update Country */
  async updateCountry(params: any, id) {
    try {
      const updateCountryRes = await this.countryModel.updateOne(
        { _id: id },
        params,
      );
      console.log('updateCountryResp', updateCountryRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: updateCountryRes,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
