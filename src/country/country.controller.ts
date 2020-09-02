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
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  /* Get Countries */
  @Get()
  async getCountries() {
    try {
      const courses = await this.countryService.getAllCountries();
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
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
      const deleteCountryResponse = this.countryService.deleteCountry(id);
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
