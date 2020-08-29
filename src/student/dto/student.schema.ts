import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop()
  education: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  emailAddress: string;

  @Prop()
  mobileNumber: number;

  @Prop()
  password: string;

  @Prop()
  country: string;

  @Prop()
  course: string;

  @Prop()
  @IsOptional()
  favoriteUniversities?: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export interface IStudent extends Document {
  readonly education: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly mobileNumber: number;
  readonly password: string;
  readonly country: string;
  readonly course: string;
}
