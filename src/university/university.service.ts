import { Injectable, HttpStatus } from '@nestjs/common';
import { University } from './dto/university.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/dto/api-response-dto';
import { CreateUniversityDto } from './dto/create-university.dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { UniversityApplication } from 'src/university-applications/dto/university-applications.schema';
import { User } from 'src/user/dto/user.schema';
import { Country } from 'src/country/dto/country.schema';
import { ApplicationStatus } from 'src/application-status/dto/application-status.schema';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('University') private universityModel: Model<University>,
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
    @InjectModel('UniversityApplication')
    private universityApplicationModel: Model<UniversityApplication>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('ApplicationStatus')
    private applicationStatusModel: Model<ApplicationStatus>,
  ) {}

  /* Get all universities */
  async getAllUniversities(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const findObject: any = {
        isDeleted: false,
        ...params.findObject,
      };

      if (params.findObject.searchString) {
        findObject.universityName = {
          $regex: '.*' + params.findObject.searchString + '.*',
          $options: 'i',
        };
      }
      delete findObject.searchString;

      console.log(findObject);

      let universitiesCount = await this.universityModel
        .find(findObject)
        .count();

      let universities = await this.universityModel
        .find(findObject)
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { universities, total_count: universitiesCount },
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create University */
  async createUniversity(createUniversityDto: any) {
    try {
      const createUniversityRes = await this.universityModel.create(
        createUniversityDto,
      );
      console.log('create uni resp', createUniversityRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: createUniversityRes,
        message: 'Request Successful!!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  /* Create University */
  async updateUniversity(id: string, params: any) {
    try {
      const updateUniversityRes = await this.universityModel.updateOne(
        { _id: id },
        params,
      );

      console.log('create uni resp', updateUniversityRes);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: updateUniversityRes,
        message: 'Request Successful!!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async getUniversityApplications(id, params: FetchParamsDto) {
    try {
      const universityDetails = await this.universityDetailsModel
        .find({ isDeleted: false, university: id })
        .select('_id');

      const detailsIds = [];
      universityDetails.map((details: any) => {
        detailsIds.push(details._id);
      });

      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const applicationsCount = await this.universityApplicationModel
        .find({
          isDeleted: false,
          universityDetails: { $in: detailsIds },
        })
        .count();

      const applications = await this.universityApplicationModel
        .find({
          isDeleted: false,
          universityDetails: { $in: detailsIds },
        })
        .populate({ path: 'user', model: this.userModel })
        .populate({
          path: 'universityDetails',
          model: this.universityDetailsModel,
          populate: [
            {
              path: 'country',
              model: this.countryModel,
            },
          ],
        })
        .populate({ path: 'status', model: this.applicationStatusModel })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: { applications, total_count: applicationsCount },
        message: 'Request Successful!!!',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }
}
