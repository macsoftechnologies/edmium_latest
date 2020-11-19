import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, Scheduled } from 'nestjs-cron';
// import { Notifications } from 'src/notification/dto/notification.schema';
import { Reminders } from 'src/reminder/dto/reminder.schema';

import moment = require('moment');

@Scheduled()
@Injectable()
export class CronService {
  constructor(
    // @InjectModel('Notifications')
    // private notificationModel: Model<Notifications>,

    @InjectModel('Reminder')
    private remindersModel: Model<Reminders>,
  ) {}

  @Cron('0 * * * * *')
  async sendReminders(): Promise<any> {
    const reminders = await this.remindersModel.find({
      dateTime: { $lt: new Date() },
      isTriggered: false,
    });
    console.log(reminders);
  }
}
