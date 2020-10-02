import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationDto } from './dto/notification.dto';
import { AxiosRequestConfig } from 'axios'

const headers = {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
    "Authorization": "key=AAAAURSrEuQ:APA91bE8cPQSgC94OKEtwZw40ipXkWe2HYN0xd7w6PfLK73GCetraD9ztu8CwkkKxQEk6QYku7Kw4TzdzTXmbqVB4Bn3OYGo1DMTzWTgUO3KCGwOYntF9cm68zppLmhRqt_3aZBsR_Fh"
}

const axiosHeaders: AxiosRequestConfig = {
    headers: headers,
    timeout: 9000000
  }

@Injectable()
export class NotificationService {

    constructor(private http: HttpService) { }


    async sendNotifications(notificationDto: NotificationDto): Promise<any> {

        const url = "https://fcm.googleapis.com/fcm/send"
        const body = notificationDto

        const notificationResponse = await this.http.post(url, body,axiosHeaders).toPromise()

        console.log('notificationResponse' , notificationResponse)
        // return notificationResponse


    }


}
