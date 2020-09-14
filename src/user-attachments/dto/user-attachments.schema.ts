import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserAttachment extends Document {
  @Prop()
  userId: string;

  @Prop()
  attachment: string;

  @Prop()
  category: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserAttachmentSchema = SchemaFactory.createForClass(
  UserAttachment,
);
