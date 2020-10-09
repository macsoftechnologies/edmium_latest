import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { UniversityApplicationSchema } from 'src/university-applications/dto/university-applications.schema';
import { UserSchema } from 'src/user/dto/user.schema';
import { CommissionTransactionsController } from './commission-transactions.controller';
import { CommissionTransactionsService } from './commission-transactions.service';
import { CommissionTransactionsSchema } from './dto/commission-transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CommissionTransactions', schema: CommissionTransactionsSchema },
      { name: 'UniversityApplication', schema: UniversityApplicationSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CommissionTransactionsController],
  providers: [CommissionTransactionsService, SharedService],
})
export class CommissionTransactionsModule {}
