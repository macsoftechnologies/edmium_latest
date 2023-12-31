import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop()
  name: string;

  @Prop()
  specialization: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

export interface ICourse extends Document {
  readonly name: string;
  readonly areaOfInterest: string;
}
