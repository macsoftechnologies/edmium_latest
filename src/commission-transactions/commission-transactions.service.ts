import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from 'src/country/dto/country.schema';
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
    @InjectModel('Country')
    private countryModel: Model<Country>,
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
    const transactionsCount = await this.commissionTransactionsModel
      .find({
        isDeleted: false,
        ...params.findObject,
      })
      .count();

    const transactions = await this.commissionTransactionsModel
      .aggregate([
        {
          $match: {
            isDeleted: false,
            ...params.findObject,
          },
        },

        {
          $addFields: {
            userId: {
              $toObjectId: '$user',
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },

        {
          $addFields: {
            agentId: {
              $toObjectId: '$agent',
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'agentId',
            foreignField: '_id',
            as: 'agent',
          },
        },
        { $unwind: '$agent' },

        {
          $addFields: {
            applicationsId: {
              $toObjectId: '$application',
            },
          },
        },
        {
          $lookup: {
            from: 'universityapplications',
            localField: 'applicationsId',
            foreignField: '_id',
            as: 'application',
          },
        },
        { $unwind: '$application' },

        {
          $addFields: {
            universityDetailsId: {
              $toObjectId: '$application.universityDetails',
            },
          },
        },
        {
          $lookup: {
            from: 'universitydetails',
            localField: 'universityDetailsId',
            foreignField: '_id',
            as: 'application.universityDetails',
          },
        },
        { $unwind: '$application.universityDetails' },

        {
          $addFields: {
            universityId: {
              $toObjectId: '$application.universityDetails.university',
            },
          },
        },
        {
          $lookup: {
            from: 'universities',
            localField: 'universityId',
            foreignField: '_id',
            as: 'application.university',
          },
        },
        { $unwind: '$application.university' },

        {
          $addFields: {
            countryId: {
              $toObjectId: '$country',
            },
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'countryId',
            foreignField: '_id',
            as: 'country',
          },
        },
        { $unwind: '$country' },

        {
          $addFields: {
            currencyId: {
              $toObjectId: '$country.currency',
            },
          },
        },
        {
          $lookup: {
            from: 'currencies',
            localField: 'currencyId',
            foreignField: '_id',
            as: 'country.currency',
          },
        },
        { $unwind: '$country.currency' },
      ])
      .sort(sortObject)
      .skip(params.paginationObject.start)
      .limit(params.paginationObject.limit);

    let apiResponse: APIResponse = {
      statusCode: HttpStatus.OK,
      data: { transactions, total_count: transactionsCount },
      message: 'Request Successful',
    };
    return apiResponse;
  }

  async getOne(params: any): Promise<any> {
    return await this.commissionTransactionsModel.findOne(params);
  }

  async fetch(params: any): Promise<any> {
    return await this.commissionTransactionsModel
      .find({
        isDeleted: false,
        ...params,
      })
      .populate({
        path: 'country',
        model: this.countryModel,
        retainNullValues: true,
      });
  }
}
