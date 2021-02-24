import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class University extends Document {
  @Prop()
  universityName: string;

  @Prop({ default: null })
  universityProfileImage: string;

  @Prop({ default: null })
  universityBackgroundImage: string;

  @Prop()
  website: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UniversitySchema = SchemaFactory.createForClass(University);

export interface IUniversity extends Document {
  readonly universityName: string;
  readonly universityProfileImage: string;
  readonly universityBackgroundImage: string;
}
