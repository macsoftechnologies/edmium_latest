import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateNotificationDto,
  NotificationDto,
  UpdateNotificationDto,
} from './dto/notification.dto';
import { AxiosRequestConfig } from 'axios';
import { Model } from 'mongoose';
import { Notifications } from './dto/notification.schema';
import { APIResponse } from 'src/dto/api-response-dto';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

const headers = {
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip',
  Authorization:
    'key=AAAAURSrEuQ:APA91bE8cPQSgC94OKEtwZw40ipXkWe2HYN0xd7w6PfLK73GCetraD9ztu8CwkkKxQEk6QYku7Kw4TzdzTXmbqVB4Bn3OYGo1DMTzWTgUO3KCGwOYntF9cm68zppLmhRqt_3aZBsR_Fh',
};

const axiosHeaders: AxiosRequestConfig = {
  headers: headers,
  timeout: 9000000,
};

@Injectable()
export class NotificationService {
  constructor(
    private http: HttpService,
    @InjectModel('Notifications')
    private notificationModel: Model<Notifications>,
  ) {}

  async sendNotifications(notificationDto: NotificationDto): Promise<any> {
    const saveNotification = await this.notificationModel.create(
      notificationDto,
    );

    const url = 'https://fcm.googleapis.com/fcm/send';
    const body = notificationDto;
    delete body.usersTo;

    const notificationResponse = await this.http
      .post(url, body, axiosHeaders)
      .toPromise();
  }

  async getNotifications(params: FetchParamsDto, user: string) {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const notificationsCount = await this.notificationModel
        .find({ usersTo: { $in: [user] }, isDeleted: false })
        .count();

      const notifications = await this.notificationModel
        .find({ usersTo: { $in: [user] }, isDeleted: false })
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      return {
        statusCode: HttpStatus.OK,
        message: 'Request SuccessFully',
        data: { notifications, total_count: notificationsCount },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  async create(params: NotificationDto): Promise<any> {
    const response = await this.notificationModel.create(params);

    let apiResponse: APIResponse = {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Request Successful!!!',
    };
    return apiResponse;
  }

  async update(id: string, params: any): Promise<any> {
    const response = await this.notificationModel.updateOne(
      { _id: id },
      params,
    );

    let apiResponse: APIResponse = {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Request Successful!!!',
    };
    return apiResponse;
  }
}
