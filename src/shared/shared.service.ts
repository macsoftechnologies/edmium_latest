import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from 'src/user/dto/user.schema';

const xlsx = require('xlsx');
const AWS = require('aws-sdk');

const config = {
  AWS_ACCESS_KEY: 'AKIAJRWPZ3BTWK7YU3AQ',
  AWS_SECRET_KEY: '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',
  AWS_BUCKET: 'edmium',
};

const paginationObject = {
  start: 0,
  limit: 1000,
  sortBy: 'createdAt',
  sortOrder: 'DESC',
};

// const profileCompletionPercentageConfig = {
//   profileImage: 10,
//   maritalStatus: 10,
//   mailingAddress1: 10,
//   permanentAddress1: 10,
//   passportNumber: 10,
//   nationality: 10,
//   emergencyContactName: 10,
//   userAcademicInfo: 10,
//   userWorkInfo: 5,
//   userTests: 5,
// };

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
});
@Injectable()
export class SharedService {
  // constructor(@InjectModel('User') private userModel: Model<User>) {}

  async excelToJSON(fileData): Promise<any> {
    var result = xlsx.read(fileData, {
      type: 'buffer',
    });

    const sheets = Object.keys(result.Sheets);

    const excelData = result.Sheets[sheets[0]];
    const keys = Object.keys(result.Sheets[sheets[0]]);

    keys.splice(keys.indexOf('!ref'), 1);
    keys.splice(keys.indexOf('!margins'), 1);
    keys.splice(keys.indexOf('!rows'), 1);

    const table = [];

    const columns = [];

    const headerIndex = parseInt(
      keys[0].substring(keys[0].length - 1, keys[0].length),
    );

    var i = 0;
    for (; i < keys.length; i++) {
      if (
        headerIndex ===
        parseInt(keys[i].substring(keys[i].length - 1, keys[i].length))
      ) {
        columns.push(keys[i].substring(0, keys[i].length - 1).trim());
      } else {
        break;
      }
    }

    let currentIndex = headerIndex + 1;

    var record = {};
    for (var j = 0; i < keys.length; i++, j++) {
      if (columns.length == j) {
        table.push(record);
        record = {};
        j = 0;
        currentIndex++;
      }
      if (excelData[columns[j] + currentIndex]) {
        let value = excelData[columns[j] + currentIndex].v;
        if (typeof value == 'string') {
          value = value.trim();
        }

        record[excelData[columns[j] + headerIndex].v] = value;
      } else {
        record[excelData[columns[j] + headerIndex].v] = null;
        i--;
      }
    }
    table.push(record);

    return table;
  }

  async uploadFileToAWSBucket(file, path) {
    let fileName = file.originalname;
    fileName = fileName.replace(/\//g, '-');
    fileName = fileName.replace(/ /g, '_');
    fileName = fileName.replace(/[()]/g, '');
    let index = fileName.lastIndexOf('.');
    if (index === -1) index = fileName.length;
    fileName =
      fileName.substring(0, index) +
      '-' +
      new Date().getTime() +
      fileName.substring(index);

    return await s3
      .upload({
        Bucket: config.AWS_BUCKET,
        Key: path + '/' + fileName, // File name you want to save as in S3
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      })
      .promise();
  }

  async prepareParams(params: any): Promise<any> {
    // params = Object.assign(params, paginationObject);
    const config = {
      paginationObject: {
        start: params.start ? params.start : paginationObject.start,
        limit: params.limit ? params.limit : paginationObject.limit,
        sortBy: params.sortBy ? params.sortBy : paginationObject.sortBy,
        sortOrder: params.sortOrder
          ? params.sortOrder
          : paginationObject.sortOrder,
      },
      findObject: params,
    };

    delete config.findObject.start;
    delete config.findObject.limit;
    delete config.findObject.sortBy;
    delete config.findObject.sortOrder;

    return config;
  }

  //Get agents
  // async updateProfileCompletionPercentage(id: string): Promise<any> {
  //   try {
  //     let profileCompletionPercentage = 10;

  //     let userData = await this.userModel.aggregate([
  //       {
  //         $addFields: {
  //           userId: {
  //             $toString: '$_id',
  //           },
  //         },
  //       },
  //       {
  //         $match: { userId: id },
  //       },
  //       {
  //         $lookup: {
  //           from: 'userpersonalinfos',
  //           let: {
  //             isDeleted: false,
  //             userId: '$userId',
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $and: [
  //                     { $eq: ['$isDeleted', '$$isDeleted'] },
  //                     { $eq: ['$userId', '$$userId'] },
  //                   ],
  //                 },
  //               },
  //             },
  //           ],
  //           as: 'userPersonalInfo',
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: '$userPersonalInfo',
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'useracademicinfos',
  //           let: {
  //             isDeleted: false,
  //             userId: '$userId',
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $and: [
  //                     { $eq: ['$isDeleted', '$$isDeleted'] },
  //                     { $eq: ['$userId', '$$userId'] },
  //                   ],
  //                 },
  //               },
  //             },
  //           ],
  //           as: 'userAcademicInfo',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'userworkinfos',
  //           let: {
  //             isDeleted: false,
  //             userId: '$userId',
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $and: [
  //                     { $eq: ['$isDeleted', '$$isDeleted'] },
  //                     { $eq: ['$userId', '$$userId'] },
  //                   ],
  //                 },
  //               },
  //             },
  //           ],
  //           as: 'userWorkInfo',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'usertests',
  //           let: {
  //             isDeleted: false,
  //             userId: '$userId',
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $and: [
  //                     { $eq: ['$isDeleted', '$$isDeleted'] },
  //                     { $eq: ['$userId', '$$userId'] },
  //                   ],
  //                 },
  //               },
  //             },
  //           ],
  //           as: 'userTests',
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: '$userTests',
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //     ]);

  //     const user = userData[0];
  //     if (user.profileImage)
  //       profileCompletionPercentage +=
  //         profileCompletionPercentageConfig.profileImage;
  //     if (user.userPersonalInfo) {
  //       if (user.userPersonalInfo.maritalStatus)
  //         profileCompletionPercentage +=
  //           profileCompletionPercentageConfig.maritalStatus;
  //       if (user.userPersonalInfo.mailingAddress1)
  //         profileCompletionPercentage +=
  //           profileCompletionPercentageConfig.mailingAddress1;
  //       if (user.userPersonalInfo.permanentAddress1)
  //         profileCompletionPercentage +=
  //           profileCompletionPercentageConfig.permanentAddress1;
  //       if (user.userPersonalInfo.passportNumber)
  //         profileCompletionPercentage +=
  //           profileCompletionPercentageConfig.passportNumber;
  //       if (user.userPersonalInfo.nationality)
  //         profileCompletionPercentage +=
  //           profileCompletionPercentageConfig.nationality;
  //       if (user.userPersonalInfo.emergencyContactName)
  //         profileCompletionPercentage +=
  //           profileCompletionPercentageConfig.emergencyContactName;
  //     }
  //     if (user.userAcademicInfo && user.userAcademicInfo.length)
  //       profileCompletionPercentage +=
  //         profileCompletionPercentageConfig.userAcademicInfo;
  //     if (user.userWorkInfo && user.userWorkInfo.length)
  //       profileCompletionPercentage +=
  //         profileCompletionPercentageConfig.userWorkInfo;
  //     if (user.userTests)
  //       profileCompletionPercentage +=
  //         profileCompletionPercentageConfig.userTests;

  //     console.log(profileCompletionPercentage);
  //   } catch (error) {}
  // }
}
