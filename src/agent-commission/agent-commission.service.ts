import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from 'src/country/dto/country.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import { Education } from 'src/education/dto/education.schema';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import { University } from 'src/university/dto/university.schema';
import { CommissionDto, CommissionUpdateDto } from './dto/agent-commission.cto';
import { AgentCommission } from './dto/agent-commission.schema';

@Injectable()
export class AgentCommissionService {
  constructor(
    @InjectModel('AgentCommission')
    private agentCommissionModel: Model<AgentCommission>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('University')
    private universityModel: Model<University>,
    @InjectModel('Education')
    private educationModel: Model<Education>,
  ) {}

  async addCommission(commission: CommissionDto) {
    try {
      const university = commission.university;
      const Country = commission.country;
      const Education = commission.education;

      const duplicate = await this.agentCommissionModel.findOne({
        $and: [
          { university: university },
          { country: Country },
          { education: Education },
          { isDeleted: false },
        ],
      });
      if (duplicate) {
        return {
          statusCode: HttpStatus.CONFLICT,
          data: duplicate,
          errorMessage: 'Commission Already exit',
        };
      }

      const response = await this.agentCommissionModel.create(commission);
      if (response) {
        return {
          statusCode: HttpStatus.OK,
          data: response,
          message: 'Commission Added SuccessFully',
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: null,
        errorMessage: 'Commission Added Failed ',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  async updateCommission(updateCommission: CommissionUpdateDto) {
    try {
      const CommissionId = updateCommission.commissionId;
      const Commission = updateCommission.commission;

      const response = await this.agentCommissionModel.updateOne(
        { _id: CommissionId },
        { $set: { commission: Commission } },
      );

      if (response.nModified == 1) {
        return {
          statusCode: HttpStatus.OK,
          data: null,
          message: 'Commission Updated SuccessFully',
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: null,
        errorMessage: 'Commission Updated Failed ',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  async getCommissionById(CommissionId: string) {
    try {
      const response = await this.agentCommissionModel
        .findOne({ _id: CommissionId })
        .populate({
          path: 'country',
          model: this.countryModel,
          retainNullValues: true,
        })
        .populate({
          path: 'university',
          model: this.universityModel,
          retainNullValues: true,
        });

      if (response) {
        return {
          statusCode: HttpStatus.OK,
          data: response,
          message: 'Commission Details',
        };
      }

      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        errorMessage: 'Commission Not Found ',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  async getCommissions(params: FetchParamsDto) {
    try {
      console.log(params);
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const commissionsCount = await this.agentCommissionModel.aggregate([
        {
          $match: { isDeleted: false },
        },

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
            universityId: {
              $toObjectId: '$university',
            },
          },
        },
        {
          $lookup: {
            from: 'universities',
            localField: 'universityId',
            foreignField: '_id',
            as: 'university',
          },
        },
        { $unwind: '$university' },
        {
          $count: 'count',
        },
      ]);

      const commissions = await this.agentCommissionModel
        .aggregate([
          {
            $match: { isDeleted: false },
          },

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
              universityId: {
                $toObjectId: '$university',
              },
            },
          },
          {
            $lookup: {
              from: 'universities',
              localField: 'universityId',
              foreignField: '_id',
              as: 'university',
            },
          },
          { $unwind: '$university' },
        ])
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      return {
        statusCode: HttpStatus.OK,
        data: {
          commissions,
          total_count:
            commissionsCount[0] && commissionsCount[0].count
              ? commissionsCount[0].count
              : 0,
        },
        message: 'Commissions List',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  async updateCommissionStatus(params: any, CommissionId): Promise<any> {
    try {
      const found = await this.agentCommissionModel.findOne({
        _id: CommissionId,
      });
      if (found) {
        const updateCommissionResponse = await this.agentCommissionModel.updateOne(
          { _id: CommissionId },
          params,
        );

        let apiResponse: APIResponse = {
          statusCode: HttpStatus.OK,
          data: updateCommissionResponse,
          message: 'Request Successful',
        };
        return apiResponse;
      } else {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          errorMessage: 'Commission Not Found',
        };
      }
    } catch (error) {
      return error;
    }
  }

  async getOne(params: any): Promise<any> {
    console.log(params);
    try {
      return await this.agentCommissionModel.findOne({
        isDeleted: false,
        ...params,
      });
    } catch (error) {
      return error;
    }
  }
}
