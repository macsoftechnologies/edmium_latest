import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Country } from './dto/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIReponse } from 'src/dto/api-response-dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { create } from 'domain';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country')
    private countryModel: Model<Country>,
  ) {}

  /* Get all countries */
  async getAllCountries(): Promise<any> {
    try {
      let countriesList = await this.countryModel.find();
      console.log('countries list', countriesList);
      let apiResponse: APIReponse = {
        statusCode: HttpStatus.OK,
        data: countriesList,
        message: 'Request Successfull !!!',
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
      let apiResponse: APIReponse = {
        statusCode: HttpStatus.OK,
        data: createCountryRes,
        message: 'Request Successfull !!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
  /* Update Country */
  async updateCountry(createCountryDto: CreateCountryDto, id) {
    try {
      const updateCountryRes = this.countryModel.findOneAndUpdate(
        { _id: id },
        createCountryDto,
        { upsert: true, new: true },
      );
      console.log('updateCountryResp', updateCountryRes);
      let apiResponse: APIReponse = {
        statusCode: HttpStatus.OK,
        data: updateCountryRes,
        message: 'Request Successfull !!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
  /* Delete country */
  async deleteCountry(id) {
    try {
      const found = this.countryModel.findOne({ _id: id });
      if (found) {
        const deleteCountryRes = this.countryModel.deleteOne({ _id: id });
        console.log('deleteCountryResp', deleteCountryRes);
        let apiResponse: APIReponse = {
          statusCode: HttpStatus.OK,
          data: deleteCountryRes,
          message: 'Request Successfull !!!',
        };
        return apiResponse;
      } else {
        throw new NotFoundException(`There is no country map with id ${id} `);
      }
    } catch (error) {
      return error;
    }
  }
}
