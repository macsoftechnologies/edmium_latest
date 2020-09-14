import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserAcademicInfo extends Document {
  @Prop()
  userId: string;

  @Prop()
  levelOfStudy: string;

  @Prop()
  nameOfInstitution: string;

  @Prop()
  cityOfStudy: string;

  @Prop()
  countryOfStudy: string;

  @Prop()
  @IsOptional()
  qualificationAchieved: string;

  @Prop()
  percentage: number;

  @Prop()
  primaryLanguage: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserAcademicInfoSchema = SchemaFactory.createForClass(
  UserAcademicInfo,
);
