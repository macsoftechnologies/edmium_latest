import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './dto/country.schema';
import { CurrencySchema } from 'src/currency/dto/currency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Country', schema: CountrySchema },
      { name: 'Currency', schema: CurrencySchema },
    ]),
  ],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
