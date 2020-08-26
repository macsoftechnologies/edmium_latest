import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class University extends Document {
  @Prop()
  universityName: string;

  @Prop({ default: null })
  universityProfileImg: string;

  @Prop({ default: null })
  universityBackgroundProfileImg: string;
}

export const UniversitySchema = SchemaFactory.createForClass(University);

export interface IUniversity extends Document {
  readonly universityName: string;
  readonly universityProfileImg: string;
  readonly universityBackgroundProfileImg: string;
}
