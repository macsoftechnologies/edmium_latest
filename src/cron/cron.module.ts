import { HttpModule, Module } from '@nestjs/common';
import { ReminderSchema } from 'src/reminder/dto/reminder.schema';
import { ReminderService } from 'src/reminder/reminder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from './cron.service';
import { NotificationSchema } from 'src/notification/dto/notification.schema';
import { NotificationService } from 'src/notification/notification.service';
import { UserAuthenticationSchema } from 'src/user-authentication/dto/user-authentication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reminder', schema: ReminderSchema },
      { name: 'Notifications', schema: NotificationSchema },
      { name: 'UserAuthentication', schema: UserAuthenticationSchema },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 50000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [CronService, ReminderService, NotificationService],
})
export class CronModule {}
