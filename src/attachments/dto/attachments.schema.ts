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
  @IsOptional()
  universityId?: string;

  @Prop()
  attachment: string;

  @Prop()
  @IsOptional()
  name?: string;

  @Prop()
  @IsOptional()
  fileType?: string;

  @Prop()
  category: string;

  @Prop()
  @IsOptional()
  subCategory: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
