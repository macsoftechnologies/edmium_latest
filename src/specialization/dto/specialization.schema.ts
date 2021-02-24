import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Specialization extends Document {
  @Prop()
  concentration?: string;

  @Prop()
  name: string;

  @Prop()
  education: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const SpecializationSchema = SchemaFactory.createForClass(
  Specialization,
);
