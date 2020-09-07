import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from './dto/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUser,
  UserLogin,
  FavoriteListDto,
  FilterStudentsDto,
} from './dto/user.dto';
import { APIResponse } from 'src/dto/api-response-dto';
import { Education } from 'src/education/dto/education.schema';
import { Country } from 'src/country/dto/country.schema';
import { Course } from 'src/course/dto/course.schema';
import { UniversityDetails } from 'src/university_details/dto/university_details.schema';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';
import { University } from 'src/university/dto/university.schema';

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
      await this.userModel.updateOne(
        { _id: params.userId },
        { $addToSet: { favoriteUniversities: params.universityId } },
      );
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
      await this.userModel.updateOne(
        { _id: params.userId },
        { $pull: { favoriteUniversities: params.universityId } },
      );
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

  // Get Favorite Universities
  async getFavoriteUniversities(id: string): Promise<any> {
    try {
      const userData = await this.userModel.findById(id).populate({
        path: 'favoriteUniversities',
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
          { $unwind: '$universityApplications' },
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
          { $unwind: '$universityApplications.universityDetails' },
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
