import { Injectable } from '@nestjs/common';

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

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
});
@Injectable()
export class SharedService {
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
    params = Object.assign(params, paginationObject);
    const config = {
      paginationObject: {
        start: params.start,
        limit: params.limit,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      },
      findObject: params,
    };

    delete config.findObject.start;
    delete config.findObject.limit;
    delete config.findObject.sortBy;
    delete config.findObject.sortOrder;

    return config;
  }
}
