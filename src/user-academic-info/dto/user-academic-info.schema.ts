import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserAcademicInfo extends Document {
  @Prop()
  userId: string;

  @Prop()
  levelOfStudy: string;

  @Prop({ default: false })
  otherInstitute: boolean;

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
  scoreType: string; // cgpa, gpa, percentage

  @Prop()
  score: number;

  @Prop()
  primaryLanguage: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop({ default: 0 })
  @IsOptional()
  numberOfBacklogs: number;

  @Prop()
  @IsOptional()
  yearOfPassing: number;

  @Prop({ default: false })
  @IsOptional()
  isHighestEducation?: boolean;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserAcademicInfoSchema = SchemaFactory.createForClass(
  UserAcademicInfo,
);
