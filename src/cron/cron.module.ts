import { Module } from '@nestjs/common';
import { ReminderSchema } from 'src/reminder/dto/reminder.schema';
import { ReminderService } from 'src/reminder/reminder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from './cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reminder', schema: ReminderSchema }]),
  ],
  providers: [CronService, ReminderService],
})
export class CronModule {}
