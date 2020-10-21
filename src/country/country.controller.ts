import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { APIResponse } from 'src/dto/api-response-dto';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
  constructor(
    private countryService: CountryService,
    private sharedService: SharedService,
  ) {}

  /* Get Countries */
  @Get()
  async getCountries() {
    try {
      const params = await this.sharedService.prepareParams({});
      const courses = await this.countryService.getAllCountries(params);
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Get All Universities */
  @Post('/listing')
  async getAllCountries(@Body() body: PaginationDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      const response = await this.countryService.getAllCountries(params);
      return response;
    } catch (error) {
      const apiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error.message,
      };
      return apiResponse;
    }
  }

  /* Create Country */
  @Post()
  async createCountry(@Body() createCountryDto: CreateCountryDto) {
    try {
      const createCountryResponse = this.countryService.createCountry(
        createCountryDto,
      );
      return createCountryResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
  /* Update Country */
  @Put('/:id')
  async updateCountry(
    @Body() createCountryDto: CreateCountryDto,
    @Param('id') id: string,
  ) {
    try {
      const updateCountryResponse = this.countryService.updateCountry(
        createCountryDto,
        id,
      );
      return updateCountryResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Delete Country */
  @Delete('/:id')
  async deleteCourse(@Param('id') id: string) {
    try {
      const deleteCountryResponse = this.countryService.updateCountry(
        { isDeleted: true },
        id,
      );
      return deleteCountryResponse;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
