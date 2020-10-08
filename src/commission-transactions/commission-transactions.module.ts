import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommissionTransactionsController } from './commission-transactions.controller';
import { CommissionTransactionsService } from './commission-transactions.service';
import { CommissionTransactionsSchema } from './dto/commission-transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CommissionTransactions', schema:  CommissionTransactionsSchema},
    ]),
  ],
  controllers: [CommissionTransactionsController],
  providers: [CommissionTransactionsService]
})
export class CommissionTransactionsModule {}
