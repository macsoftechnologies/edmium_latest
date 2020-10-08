import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UniversityInfo extends Document {
  @Prop()
  universityId: string;

  @Prop()
  category: string;

  @Prop()
  @IsOptional()
  name: string;

  @Prop()
  @IsOptional()
  description: string;

  @Prop()
  @IsOptional()
  concentration: string;

  @Prop()
  @IsOptional()
  informationLink: string;

  @Prop()
  @IsOptional()
  attachment: string;

  @Prop()
  @IsOptional()
  eventDate: string;

  @Prop()
  @IsOptional()
  comment: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UniversityInfoSchema = SchemaFactory.createForClass(
  UniversityInfo,
);
