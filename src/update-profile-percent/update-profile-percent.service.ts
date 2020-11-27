import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/dto/user.schema';

const profileCompletionPercentageConfig = {
  profileImage: 10,
  maritalStatus: 10,
  mailingAddress1: 5,
  permanentAddress1: 5,
  passportNumber: 5,
  nationality: 5,
  emergencyContactName: 5,
  userAcademicInfo: 35,
  userWorkInfo: 5,
  userTests: 5,
};

@Injectable()
export class UpdateProfilePercentService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  //Get agents
  async updateProfileCompletionPercentage(id: string): Promise<any> {
    try {
      let profileCompletionPercentage = 10;

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
        {
          $lookup: {
            from: 'userpersonalinfos',
            let: {
              isDeleted: false,
              userId: '$userId',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$isDeleted', '$$isDeleted'] },
                      { $eq: ['$userId', '$$userId'] },
                    ],
                  },
                },
              },
            ],
            as: 'userPersonalInfo',
          },
        },
        {
          $unwind: {
            path: '$userPersonalInfo',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'useracademicinfos',
            let: {
              isDeleted: false,
              userId: '$userId',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$isDeleted', '$$isDeleted'] },
                      { $eq: ['$userId', '$$userId'] },
                    ],
                  },
                },
              },
            ],
            as: 'userAcademicInfo',
          },
        },
        {
          $lookup: {
            from: 'userworkinfos',
            let: {
              isDeleted: false,
              userId: '$userId',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$isDeleted', '$$isDeleted'] },
                      { $eq: ['$userId', '$$userId'] },
                    ],
                  },
                },
              },
            ],
            as: 'userWorkInfo',
          },
        },
        {
          $lookup: {
            from: 'usertests',
            let: {
              isDeleted: false,
              userId: '$userId',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$isDeleted', '$$isDeleted'] },
                      { $eq: ['$userId', '$$userId'] },
                    ],
                  },
                },
              },
            ],
            as: 'userTests',
          },
        },
        {
          $unwind: {
            path: '$userTests',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      const user = userData[0];
      if (user.profileImage)
        profileCompletionPercentage +=
          profileCompletionPercentageConfig.profileImage;
      if (user.userPersonalInfo) {
        if (user.userPersonalInfo.maritalStatus)
          profileCompletionPercentage +=
            profileCompletionPercentageConfig.maritalStatus;
        if (user.userPersonalInfo.mailingAddress1)
          profileCompletionPercentage +=
            profileCompletionPercentageConfig.mailingAddress1;
        if (user.userPersonalInfo.permanentAddress1)
          profileCompletionPercentage +=
            profileCompletionPercentageConfig.permanentAddress1;
        if (user.userPersonalInfo.passportNumber)
          profileCompletionPercentage +=
            profileCompletionPercentageConfig.passportNumber;
        if (user.userPersonalInfo.nationality)
          profileCompletionPercentage +=
            profileCompletionPercentageConfig.nationality;
        if (user.userPersonalInfo.emergencyContactName)
          profileCompletionPercentage +=
            profileCompletionPercentageConfig.emergencyContactName;
      }
      if (user.userAcademicInfo && user.userAcademicInfo.length)
        profileCompletionPercentage +=
          profileCompletionPercentageConfig.userAcademicInfo;
      if (user.userWorkInfo && user.userWorkInfo.length)
        profileCompletionPercentage +=
          profileCompletionPercentageConfig.userWorkInfo;
      if (user.userTests)
        profileCompletionPercentage +=
          profileCompletionPercentageConfig.userTests;

      console.log(profileCompletionPercentage);

      await this.userModel.updateOne(
        { _id: id },
        { $set: { profileCompletionPercentage: profileCompletionPercentage } },
      );
    } catch (error) {}
  }
}
