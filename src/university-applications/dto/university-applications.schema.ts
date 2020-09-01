import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UniversityApplication extends Document {
  @Prop()
  user: string;

  @Prop()
  universityDetails: string;

  @Prop({ default: 'Application submitted to the Institution' })
  status?: string;
}

export const UniversityApplicationSchema = SchemaFactory.createForClass(
  UniversityApplication,
);
