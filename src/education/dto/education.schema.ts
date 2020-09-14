import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Education extends Document {
  @Prop()
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const EducationSchema = SchemaFactory.createForClass(Education);

export interface IEducation extends Document {
  readonly name: string;
  readonly description: string;
}
