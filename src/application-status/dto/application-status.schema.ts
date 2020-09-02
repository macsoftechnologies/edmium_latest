import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ApplicationStatus extends Document {
  @Prop()
  status: string;
}

export const ApplicationStatusSchema = SchemaFactory.createForClass(
  ApplicationStatus,
);
