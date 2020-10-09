import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { CurrencySchema } from './dto/currency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, SharedService],
})
export class CurrencyModule {}
