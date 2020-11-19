import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderController } from './reminder.controller';
import { ReminderSchema } from './dto/reminder.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reminder', schema: ReminderSchema }]),
  ],
  providers: [ReminderService],
  controllers: [ReminderController],
})
export class ReminderModule {}
