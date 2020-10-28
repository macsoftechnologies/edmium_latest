import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notifications extends Document {
  @Prop({ required: true })
  usersTo: string[];

  @Prop()
  notification: NotificationObject;

  @Prop({ default: false })
  @IsOptional()
  isDone?: boolean;

  @Prop({ default: false })
  @IsOptional()
  isRead?: boolean;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);

export interface NotificationObject {
  action: string;
  title: string;
  body: string;
}
