import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class ApplicationChat extends Document {
  @Prop()
  application: string;

  @Prop()
  user: string;

  @Prop()
  comment: string;

  @Prop()
  @IsOptional()
  attachments?: string[];
}

export const ApplicationChatSchema = SchemaFactory.createForClass(
  ApplicationChat,
);
