import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Intake extends Document {
  @Prop()
  name: string;
}
export const IntakeSchema = SchemaFactory.createForClass(Intake);
export interface IIntake extends Document {
  readonly name: string;
}
