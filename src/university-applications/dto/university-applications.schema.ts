import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ObjectID } from 'mongodb';

@Schema({ timestamps: true })
export class UniversityApplication extends Document {
  @Prop({ default: 12345 })
  uniqueId?: number;

  @Prop()
  year?: string;

  @Prop()
  user: string;

  @Prop()
  universityDetails: ObjectID;

  @Prop({ default: 'Application submitted to the Institution' })
  status?: string;
}

export const UniversityApplicationSchema = SchemaFactory.createForClass(
  UniversityApplication,
);