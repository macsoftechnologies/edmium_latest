import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, Scheduled } from 'nestjs-cron';
import { Notifications } from 'src/notification/dto/notification.schema';
import { NotificationService } from 'src/notification/notification.service';
import { Reminders } from 'src/reminder/dto/reminder.schema';

@Scheduled()
@Injectable()
export class CronService {
  constructor(
    @InjectModel('Notifications')
    private notificationModel: Model<Notifications>,
    private notificationService: NotificationService,
    @InjectModel('Reminder')
    private remindersModel: Model<Reminders>,
  ) {}

  // @Cron('0 * * * * *')
  @Cron('*/30 * * * *')
  async sendReminders(): Promise<any> {
    console.log('Reminder Cron started at: ' + new Date());
    const reminders: any[] = await this.remindersModel
      .find({
        dateTime: { $lt: new Date() },
        isTriggered: false,
      })
      .populate({
        path: 'notification',
        model: this.notificationModel,
        retainNullValues: true,
      });

    console.log('Reminders Count: ' + reminders.length);
    if (reminders && reminders.length) {
      for (const reminder of reminders) {
        const notificationObj = {
          usersTo: reminder.notification.usersTo,
          notification: {
            action: 'reminder',
            title: 'Reminder',
            body: `Reminder of ${reminder.notification.notification.title}`,
            actionId: reminder.notification._id,
          },
        };

        await this.notificationService.sendNotifications(notificationObj);

        await this.remindersModel.updateOne(
          { _id: reminder._id },
          { isTriggered: true },
        );
      }
    }
  }
}
