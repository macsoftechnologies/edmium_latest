import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Intake extends Document {
  @Prop()
  name: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}
export const IntakeSchema = SchemaFactory.createForClass(Intake);
export interface IIntake extends Document {
  readonly name: string;
}
