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
import { Concentration } from 'src/concentration/dto/concentration.schema';
import { Course } from 'src/course/dto/course.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';
import { University } from 'src/university/dto/university.schema';

import * as _ from 'lodash';
import { UserAuthentication } from 'src/user-authentication/dto/user-authentication.schema';
import { ApplicationStatus } from 'src/application-status/dto/application-status.schema';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Education') private educationModel: Model<Education>,
    @InjectModel('Country') private countryModel: Model<Country>,
    @InjectModel('Course') private courseModel: Model<Course>,
    @InjectModel('Concentration')
    private concentrationModel: Model<Concentration>,
    @InjectModel('UniversityDetails')
    private universityDetailsModel: Model<UniversityDetails>,
    @InjectModel('University')
    private universityModel: Model<University>,
    @InjectModel('UserAuthentication')
    private userAuthenticationModel: Model<UserAuthentication>,
    @InjectModel('ApplicationStatus')
    private applicationStatusModel: Model<ApplicationStatus>,
  ) {}

  //  Create User
  async createUser(createUser: any): Promise<any> {
    try {
      createUser.role = createUser.role ? createUser.role : 'student';

      const duplicateEmail = await this.userModel.findOne({
        emailAddress: createUser.emailAddress,
        isDeleted: false,
      });

      if (duplicateEmail) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'Email Address already registered',
        };
      }

      const duplicateMobileNumber = await this.userModel.findOne({
        mobileNumber: createUser.mobileNumber,
        isDeleted: false,
      });

      if (duplicateMobileNumber) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'Mobile Number already registered',
        };
      }

      const password = createUser.password;
      delete createUser.password;

      if (createUser.role === 'student') {
        if (createUser.createdBy) {
          createUser.assignedTo = createUser.createdBy;
        } else {
          const counselors = await this.userModel.find({
            role: 'counselor',
            country: createUser.country,
            isDeleted: false,
          });

          if (counselors.length === 1) {
            createUser.createdBy = counselors[0]._id;
            createUser.assignedTo = counselors[0]._id;

            await this.userModel.updateOne(
              { _id: counselors[0]._id },
              { studentAssigned: true },
            );
          } else if (counselors.length > 1) {
            const index = _.findIndex(
              counselors,
              counselor => {
                return counselor.studentAssigned == true;
              },
              0,
            );

            if (index == -1) {
              createUser.createdBy = counselors[0]._id;
              createUser.assignedTo = counselors[0]._id;

              await this.userModel.updateOne(
                { _id: counselors[0]._id },
                { studentAssigned: true },
              );
            } else {
              const nextIndex = counselors.length - 2 < index ? 0 : index + 1;

              createUser.createdBy = counselors[nextIndex]._id;
              createUser.assignedTo = counselors[nextIndex]._id;

              await this.userModel.updateOne(
                { _id: counselors[index]._id },
                { studentAssigned: false },
              );

              await this.userModel.updateOne(
                { _id: counselors[nextIndex]._id },
                { studentAssigned: true },
              );
            }
          }
        }
      }
      const createUserRes = await this.userModel.create(createUser);
      // console.log(createUserRes);

      await this.userAuthenticationModel.create({
        user: createUserRes._id,
        password: password,
      });
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
          isDeleted: false,
        })
        .populate({
          path: 'education',
          model: this.educationModel,
          retainNullValues: true,
        })
        .populate({
          path: 'country',
          model: this.countryModel,
          retainNullValues: true,
        })
        .populate({
          path: 'concentration',
          model: this.concentrationModel,
          retainNullValues: true,
        });

      if (user) {
        const userAuthentication = await this.userAuthenticationModel.findOne({
          user: user._id,
          password: userLogIn.password,
          isDeleted: false,
        });

        if (userAuthentication) {
          return {
            statusCode: HttpStatus.OK,
            data: user,
            message: 'LogIn Successful',
          };
        }
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Invalid Credentials',
      };
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
        concentration: searchUniversitiesByIntCourUniNameDto.concentration,
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
      let userData = await this.userModel.aggregate([
        {
          $addFields: {
            userId: {
              $toString: '$_id',
            },
          },
        },
        {
          $match: { userId: id },
        },
        { $unwind: '$favoriteUniversities' },
        {
          $lookup: {
            from: 'universityapplications',
            let: {
              universityId: '$favoriteUniversities.universityId',
              userId: '$userId',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$universityDetails', '$$universityId'] },
                      { $gte: ['$user', '$$userId'] },
                    ],
                  },
                },
              },
            ],
            as: 'favoriteUniversities.universityApplications',
          },
        },
        {
          $unwind: {
            path: '$favoriteUniversities.universityApplications',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            universityDetailsId: {
              $toObjectId: '$favoriteUniversities.universityId',
            },
          },
        },
        {
          $lookup: {
            from: 'universitydetails',
            localField: 'universityDetailsId',
            foreignField: '_id',
            as: 'favoriteUniversities.universityDetails',
          },
        },
        {
          $unwind: '$favoriteUniversities.universityDetails',
        },
        {
          $addFields: {
            universityId: {
              $toObjectId: '$favoriteUniversities.universityDetails.university',
            },
          },
        },
        {
          $lookup: {
            from: 'universities',
            localField: 'universityId',
            foreignField: '_id',
            as: 'favoriteUniversities.universityDetails.university',
          },
        },
        {
          $unwind: '$favoriteUniversities.universityDetails.university',
        },
        {
          $addFields: {
            countryId: {
              $toObjectId: '$favoriteUniversities.universityDetails.country',
            },
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'countryId',
            foreignField: '_id',
            as: 'favoriteUniversities.universityDetails.country',
          },
        },
        {
          $unwind: '$favoriteUniversities.universityDetails.country',
        },
        {
          $group: {
            _id: '$_id',
            favoriteUniversities: { $push: '$favoriteUniversities' },
          },
        },
      ]);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data:
          userData && userData[0] && userData[0].favoriteUniversities
            ? userData[0].favoriteUniversities
            : [],
        message: 'Request Successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Get Users
  async getUsers(params: any): Promise<any> {
    try {
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: await this.userModel
          .find(
            { isDeleted: false, ...params },
            {
              firstName: 1,
              lastName: 1,
              emailAddress: 1,
              mobileNumber: 1,
              country: 1,
            },
          )
          .populate({ path: 'country', model: this.countryModel }),
        message: 'Request successfully',
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
      let searchFilter = {};
      let fromDateFilter = {};
      let toDateFilter = {};
      let countryFilter = {};

      if (params.fromDate && params.toDate) {
        const toDate = new Date(params.toDate);
        toDate.setDate(toDate.getDate() + 1);

        fromDateFilter['createdAt'] = {
          $gt: new Date(params.fromDate),
        };
        toDateFilter['createdAt'] = {
          $lt: toDate,
        };
      }

      if (params.country) {
        countryFilter['country'] = {
          $in: params.country,
        };
      }

      if (params.intake) {
        match['universityApplications.universityDetails.intake'] = {
          $in: params.intake,
        };
      }

      if (params.status) {
        match['universityApplications.status'] = {
          $in: params.status,
        };
      }

      if (params.searchString) {
        searchFilter['$or'] = [
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
            $match: { role: 'student', isDeleted: false },
          },
          {
            $match: fromDateFilter,
          },
          {
            $match: toDateFilter,
          },
          {
            $match: searchFilter,
          },
          {
            $match: countryFilter,
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
          {
            $unwind: {
              path: '$country',
              preserveNullAndEmptyArrays: true,
            },
          },
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
            $addFields: {
              statusId: {
                $toObjectId: '$universityApplications.status',
              },
            },
          },
          {
            $lookup: {
              from: 'applicationstatuses',
              localField: 'statusId',
              foreignField: '_id',
              as: 'universityApplications.status',
            },
          },
          {
            $unwind: {
              path: '$universityApplications.status',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              createdById: {
                $convert: {
                  input: '$createdBy',
                  to: 'objectId',
                  onError: null,
                },
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'createdById',
              foreignField: '_id',
              as: 'createdBy',
            },
          },
          {
            $unwind: {
              path: '$createdBy',
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $addFields: {
              assignedToId: {
                $convert: {
                  input: '$assignedTo',
                  to: 'objectId',
                  onError: null,
                },
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'assignedToId',
              foreignField: '_id',
              as: 'assignedTo',
            },
          },
          {
            $unwind: {
              path: '$assignedTo',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: '$_id',
              firstName: { $first: '$firstName' },
              lastName: { $first: '$lastName' },
              emailAddress: { $first: '$emailAddress' },
              mobileNumber: { $first: '$mobileNumber' },
              country: { $first: '$country' },
              createdAt: { $first: '$createdAt' },
              createdBy: { $first: '$createdBy' },
              assignedTo: { $first: '$assignedTo' },
              universityApplications: { $push: '$universityApplications' },
            },
          },
        ])
        .sort({ createdAt: -1 })
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

  // Update User
  async deleteUser(userId: string): Promise<any> {
    try {
      await this.userModel.updateOne({ _id: userId }, { isDeleted: true });
      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Deleted successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Update User
  async applicationsStatus(counselorId: string): Promise<any> {
    try {
      const response = await this.userModel.aggregate([
        {
          $match: { assignedTo: counselorId },
        },
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
            as: 'applications',
          },
        },
        {
          $unwind: {
            path: '$applications',
          },
        },
        {
          $addFields: {
            statusId: {
              $toObjectId: '$applications.status',
            },
          },
        },
        {
          $lookup: {
            from: 'applicationstatuses',
            localField: 'statusId',
            foreignField: '_id',
            as: 'status',
          },
        },
        {
          $unwind: {
            path: '$status',
          },
        },
        {
          $addFields: {
            parentStatusId: {
              $toObjectId: '$status.parentStatus',
            },
          },
        },
        {
          $lookup: {
            from: 'applicationstatuses',
            localField: 'parentStatusId',
            foreignField: '_id',
            as: 'parentStatus',
          },
        },
        {
          $unwind: {
            path: '$parentStatus',
          },
        },
      ]);

      const statusResponse: any[] = await this.applicationStatusModel
        .find({ isDeleted: false, isParentStatus: true })
        .select('status')
        .lean();

      statusResponse.map((res: any) => {
        res.count = 0;
      });

      response.map((res: any) => {
        const index = _.findIndex(
          statusResponse,
          status => {
            return status.status == res.parentStatus.status;
          },
          0,
        );
        statusResponse[index].count++;
      });

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: statusResponse,
        message: 'Request successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Get Users
  async getUsersForEligibilityCheck(params: any): Promise<any> {
    try {
      const data = await this.userModel
        .find({ isDeleted: false, ...params })
        .populate({
          path: 'country',
          model: this.countryModel,
          retainNullValues: true,
        })
        .populate({
          path: 'concentration',
          model: this.concentrationModel,
          retainNullValues: true,
        })
        .populate({
          path: 'education',
          model: this.educationModel,
          retainNullValues: true,
        })
        .sort({ createdAt: -1 })
        .skip(params.start)
        .limit(params.limit);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Related Universities
  async relatedUniversities(id: string): Promise<any> {
    try {
      const user: any = await this.userModel.findById(id).populate({
        path: 'concentration',
        model: this.concentrationModel,
        retainNullValues: true,
      });

      const params: any = {
        isDeleted: false,
      };

      if (user.country) params.country = user.country;
      if (user.concentration) params.concentration = user.concentration.name;

      console.log(params);

      const data = await this.universityDetailsModel
        .find(params)
        .populate({
          path: 'university',
          model: this.universityModel,
          retainNullValues: true,
        })
        .populate({
          path: 'country',
          model: this.countryModel,
          retainNullValues: true,
        });

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Add Suggested University
  async addSuggestedUniversity(params: FavoriteListDto): Promise<any> {
    try {
      await this.userModel.updateOne(
        { _id: params.userId },
        {
          $addToSet: {
            suggestedUniversities: params.universityId,
          },
        },
      );

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'University added to suggested list successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Remove Suggested University
  async removeSuggestedUniversity(params: FavoriteListDto): Promise<any> {
    try {
      await this.userModel.updateOne(
        { _id: params.userId },
        { $pull: { suggestedUniversities: params.universityId } },
      );

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'University removed from suggested list successfully',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  // Get Suggested Universities
  async getSuggestedUniversities(id: string): Promise<any> {
    try {
      const data = await this.userModel
        .findById(id)
        .populate({
          path: 'suggestedUniversities',
          model: this.universityDetailsModel,
          retainNullValues: true,
        })
        .select('suggestedUniversities');

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data:
          data && data.suggestedUniversities ? data.suggestedUniversities : [],
        message: 'Request successful',
      };
      return apiResponse;
    } catch (error) {
      return error;
    }
  }

  //Get agents
  async fetchAll(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const data = await this.userModel
        .find({ isDeleted: false, ...params.findObject })
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit)
        .sort(sortObject);

      let apiResponse: APIResponse = {
        statusCode: HttpStatus.OK,
        data: data,
        message: 'Request successful',
      };
      return apiResponse;
    } catch (error) {}
  }
}
