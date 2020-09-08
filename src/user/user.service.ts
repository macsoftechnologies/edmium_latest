import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from './dto/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUser,
  UserLogin,
  FavoriteListDto,
  FilterStudentsDto,
  SwitchFavoriteUniversityRanksDto,
} from './dto/user.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { Education } from 'src/education/dto/education.schema';
import { Country } from 'src/country/dto/country.schema';
import { Course } from 'src/course/dto/course.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';
import { University } from 'src/university/dto/university.schema';

import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Education') private educationModel: Model<Education>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('Course') private courseModel: Model<Course>,
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
    @InjectModel('University')
    private universityModel: Model<University>,
  ) {}

  /* Create Education */
  async createUser(createUser: any): Promise<any> {
    try {
      createUser.role = 'student';
      const createUserRes = await this.userModel.create(createUser);
      console.log(createUserRes);
      let response = {
        statusCode: HttpStatus.OK,
        data: createUserRes,
        message: 'Request Successful !!!!',
      };
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  /* Create Education */
  async userLogIn(userLogIn: UserLogin): Promise<any> {
    try {
      console.log(userLogIn);

      const user = await this.userModel
        .findOne({
          emailAddress: userLogIn.emailAddress,
          password: userLogIn.password,
        })
        .populate({ path: 'education', model: this.educationModel })
        .populate({ path: 'country', model: this.countryModel })
        .populate({ path: 'course', model: this.courseModel });
      console.log(user);
      let response = {};
      if (user) {
        response = {
          statusCode: HttpStatus.OK,
          data: user,
          message: 'LogIn Successful',
        };
      } else {
        response = {
          statusCode: HttpStatus.NOT_FOUND,
          data: user,
          message: 'Invalid Credentials',
        };
      }
      return response;
    } catch (error) {
      let error_response: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  /* Get university list based on  intake course and university */
  async getUniversitiesByIntakeCourseUniversity(
    searchUniversitiesByIntCourUniNameDto: SearchUniversitiesByIntCourUniNameDto,
  ) {
    try {
      console.log('req', searchUniversitiesByIntCourUniNameDto);
      let universities = await this.universityDetailsModel.find({
        country: searchUniversitiesByIntCourUniNameDto.country,
        course: searchUniversitiesByIntCourUniNameDto.course,
        intake: searchUniversitiesByIntCourUniNameDto.intake,
      });

      // console.log('universities', universities);
      let apiReponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universities,
        message: 'Request Successful!!!',
      };
      return apiReponse;
    } catch (error) {
      let errorApiResponse: APIResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return errorApiResponse;
    }
  }

  // Add Favorite University
  async addFavoriteUniversity(params: FavoriteListDto): Promise<any> {
    try {
      const user: any = await this.userModel.findById(params.userId);
      var index = user.favoriteUniversities.findIndex(
        fu => fu.universityId == params.universityId,
      );
      if (index == -1) {
        await this.userModel.updateOne(
          { _id: params.userId },
          {
            $push: {
              favoriteUniversities: {
                universityId: params.universityId,
                rank: parseInt(user.favoriteUniversities.length + 1),
              },
            },
          },
        );
      }
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'University added to favorite list successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Remove Favorite University
  async removeFavoriteUniversity(params: FavoriteListDto): Promise<any> {
    try {
      const user: any = await this.userModel.findById(params.userId);
      var index = user.favoriteUniversities.findIndex(
        fu => fu.universityId == params.universityId,
      );
      if (index != -1) {
        user.favoriteUniversities.splice(index, 1);

        for (var i = index; i < user.favoriteUniversities.length; i++) {
          --user.favoriteUniversities[i].rank;
        }

        await this.userModel.updateOne(
          { _id: params.userId },
          { $set: { favoriteUniversities: user.favoriteUniversities } },
        );
      }
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'University removed from favorite list successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  async switchFavoriteUniversityRanks(
    params: SwitchFavoriteUniversityRanksDto,
  ): Promise<any> {
    try {
      const user: any = await this.userModel.findById(params.userId);
      var index1 = user.favoriteUniversities.findIndex(
        fu => fu.universityId == params.universityDetailsId1,
      );

      var index2 = user.favoriteUniversities.findIndex(
        fu => fu.universityId == params.universityDetailsId2,
      );

      if (index1 != -1 && index2 !== -1) {
        const rank = user.favoriteUniversities[index1].rank;
        user.favoriteUniversities[index1].rank =
          user.favoriteUniversities[index2].rank;
        user.favoriteUniversities[index2].rank = rank;

        const favoriteUniversities = _.sortBy(
          user.favoriteUniversities,
          'rank',
        );

        await this.userModel.updateOne(
          { _id: params.userId },
          { $set: { favoriteUniversities: favoriteUniversities } },
        );
      }
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Switched University ranks successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Get Favorite Universities
  async getFavoriteUniversities(id: string): Promise<any> {
    try {
      const userData = await this.userModel.findById(id).populate({
        path: 'favoriteUniversities.universityId',
        model: this.universityDetailsModel,
        populate: [
          {
            path: 'university',
            model: this.universityModel,
          },
          {
            path: 'country',
            model: this.countryModel,
          },
        ],
      });
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: userData.favoriteUniversities,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Update User
  async updateUser(userId: string, params: any): Promise<any> {
    try {
      await this.userModel.updateOne({ _id: userId }, params);
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: await this.userModel.findById(userId),
        message: 'Updated successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Filter Students
  async filterStudents(params: FilterStudentsDto): Promise<any> {
    try {
      console.log(params);

      let match: any = {};
      let likeMatch = {};
      if (params.country) {
        match['universityApplications.universityDetails.country'] =
          params.country;
      }

      if (params.intake) {
        match['universityApplications.universityDetails.intake'] =
          params.intake;
      }

      if (params.status) {
        match['universityApplications.status'] = params.status;
      }

      if (params.searchString) {
        likeMatch['$or'] = [
          {
            firstName: {
              $regex: '.*' + params.searchString + '.*',
              $options: 'i',
            },
          },
          {
            lastName: {
              $regex: '.*' + params.searchString + '.*',
              $options: 'i',
            },
          },
          {
            emailAddress: {
              $regex: '.*' + params.searchString + '.*',
              $options: 'i',
            },
          },
        ];
      }

      let universityDetails = await this.userModel
        .aggregate([
          {
            $addFields: {
              userId: {
                $toString: '$_id',
              },
            },
          },
          {
            $lookup: {
              from: 'universityapplications',
              localField: 'userId',
              foreignField: 'user',
              as: 'universityApplications',
            },
          },
          {
            $unwind: {
              path: '$universityApplications',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              universityDetailsId: {
                $toObjectId: '$universityApplications.universityDetails',
              },
            },
          },
          {
            $lookup: {
              from: 'universitydetails',
              localField: 'universityDetailsId',
              foreignField: '_id',
              as: 'universityApplications.universityDetails',
            },
          },
          {
            $unwind: {
              path: '$universityApplications.universityDetails',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: match,
          },
          {
            $match: likeMatch,
          },
          {
            $group: {
              _id: '$_id',
              firstName: { $first: '$firstName' },
              lastName: { $first: '$lastName' },
              emailAddress: { $first: '$emailAddress' },
              mobileNumber: { $first: '$mobileNumber' },
              createdAt: { $first: '$createdAt' },
              universityApplications: { $push: '$universityApplications' },
            },
          },
        ])
        .skip(params.start)
        .limit(params.limit);

      for (const details of universityDetails) {
        if (!details.universityApplications[0]._id)
          details.universityApplications = [];
      }

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: universityDetails,
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
