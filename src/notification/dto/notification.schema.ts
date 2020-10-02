import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({required : true})
  user: string;

  @Prop({ default: null })
  notification: NotificationObject

  @Prop({ default: null })
  to: string;

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

export interface NotificationObject{
    title : string
    body : string
}
