import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommissionTransactionDto } from './dto/commission-transactions.dto';
import { CommissionTransactions } from './dto/commission-transactions.schema';

@Injectable()
export class CommissionTransactionsService {

  constructor(
    @InjectModel('CommissionTransactions')
    private commissionTransactionsModel: Model<CommissionTransactions>,
  ) { }



  async addCommission(commissionTransaction : CommissionTransactionDto) {
    try {
      const response = await this.commissionTransactionsModel.create(commissionTransaction)
      console.log('response', response)
      return response

    } catch (error) {
      return error
    }
  }
}
