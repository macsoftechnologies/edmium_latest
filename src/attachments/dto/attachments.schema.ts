import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class Attachment extends Document {
  @Prop()
  @IsOptional()
  userId?: string;

  @Prop()
  @IsOptional()
  countryId?: string;

  @Prop()
  attachment: string;

  @Prop()
  category: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
