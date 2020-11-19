import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reminders extends Document {
  @Prop()
  notification: string;

  @Prop()
  dateTime: Date;

  @Prop({ default: false })
  @IsOptional()
  isTriggered?: boolean;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminders);
