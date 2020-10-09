import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Country } from './dto/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { Currency } from 'src/currency/dto/currency.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country')
    private countryModel: Model<Country>,
    @InjectModel('Currency')
    private currencyModel: Model<Currency>,
  ) {}

  /* Get all countries */
  async getAllCountries(params: any): Promise<any> {
    try {
      let countriesList = await this.countryModel
        .find({ isDeleted: false, ...params })
        .populate({
          path: 'currency',
          model: this.currencyModel,
          retainNullValues: true,
        });
      console.log('countries list', countriesList);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: countriesList,
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
