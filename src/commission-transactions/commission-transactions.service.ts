import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import { UniversityApplication } from 'src/university-applications/dto/university-applications.schema';
import { User } from 'src/user/dto/user.schema';
import { CommissionTransactionDto } from './dto/commission-transactions.dto';
import { CommissionTransactions } from './dto/commission-transactions.schema';

@Injectable()
export class CommissionTransactionsService {
  constructor(
    @InjectModel('CommissionTransactions')
    private commissionTransactionsModel: Model<CommissionTransactions>,
    @InjectModel('UniversityApplication')
    private universityApplicationModel: Model<UniversityApplication>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async insertTransaction(commissionTransaction: CommissionTransactionDto) {
    try {
      const response = await this.commissionTransactionsModel.create(
        commissionTransaction,
      );
      console.log('response', response);
      return response;
    } catch (error) {
      return error;
    }
  }

  async update(condition: any, params: any): Promise<any> {
    return await this.commissionTransactionsModel.update(
      condition,
      { $set: params },
      { multi: true },
    );
  }

  async getAll(params: FetchParamsDto): Promise<any> {
    const sortObject = {};
    sortObject[params.paginationObject.sortBy] =
      params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

    console.log(params);
    const response = await this.commissionTransactionsModel
      .find({
        isDeleted: false,
        ...params.findObject,
      })
      .populate({
        path: 'user',
        model: this.userModel,
        retainNullValues: true,
      })
      .populate({
        path: 'agent',
        model: this.userModel,
        retainNullValues: true,
      })
      .populate({
        path: 'application',
        model: this.universityApplicationModel,
        retainNullValues: true,
      })
      .skip(params.paginationObject.start)
      .limit(params.paginationObject.limit)
      .sort(sortObject);

    let apiResponse: APIResponse = {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Request Successful',
    };
    return apiResponse;
  }

  async getOne(params: any): Promise<any> {
    return await this.commissionTransactionsModel.findOne(params);
  }
}
