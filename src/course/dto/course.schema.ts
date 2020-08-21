import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop()
  code: string;

  @Prop()
  areaOfInterest: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

export interface ICourse extends Document {
  readonly name: string;
  readonly areaOfInterest: string;
}
