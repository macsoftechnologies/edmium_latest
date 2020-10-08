import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notifications extends Document {
  @Prop({required : true})
  usersTo: string[];

  @Prop()
  notification: NotificationObject

  @Prop()
  registration_ids: string[];

}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);

export interface NotificationObject{
    title : string
    body : string
}
