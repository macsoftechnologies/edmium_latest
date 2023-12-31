import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attachment } from 'src/attachments/dto/attachments.schema';
import { Concentration } from 'src/concentration/dto/concentration.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import { User } from 'src/user/dto/user.schema';
import { CreateUniversityInfoDto } from './dto/university-info.dto';
import { UniversityInfo } from './dto/university-info.schema';

@Injectable()
export class UniversityInfoService {
  constructor(
    @InjectModel('UniversityInfo')
    private universityInfoModel: Model<UniversityInfo>,
    @InjectModel('Attachment')
    private attachmentModel: Model<Attachment>,
    @InjectModel('Concentration')
    private concentrationModel: Model<Concentration>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async createUniversityInfo(params: any): Promise<any> {
    try {
      const response = await this.universityInfoModel.create(params);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async getUniversityInfo(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const universityInfoCount = await this.universityInfoModel
        .find({ isDeleted: false, ...params.findObject })
        .count();

      const universityInfo = await this.universityInfoModel
        .find({ isDeleted: false, ...params.findObject })
        .populate({
          path: 'attachment',
          model: this.attachmentModel,
          retainNullValues: true,
        })
        .populate({
          path: 'concentration',
          model: this.concentrationModel,
          retainNullValues: true,
        })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { universityInfo, total_count: universityInfoCount },
        message: 'Request successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async updateUniversityInfo(id: string, params: any): Promise<any> {
    try {
      const response = await this.universityInfoModel.updateOne(
        { _id: id },
        params,
      );

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async getScholarshipsOfUser(userId: string, params: FetchParamsDto) {
    const user = await this.userModel.findById(userId);

    let scholarships = [];
    let scholarshipsCount = 0;

    if (user && user.concentration) {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      scholarshipsCount = await this.universityInfoModel
        .find({
          isDeleted: false,
          category: 'scholarship',
          concentration: user.concentration,
        })
        .count();

      scholarships = await this.universityInfoModel
        .find({
          isDeleted: false,
          category: 'scholarship',
          concentration: user.concentration,
        })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);
    }

    let apiResponse: APIResponse = {
      statusCode: HttpStatus.OK,
      data: { scholarships, total_count: scholarshipsCount },
      message: 'Request Successful',
    };

    return apiResponse;
  }
}
