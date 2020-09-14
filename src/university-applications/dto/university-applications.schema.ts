import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UniversityApplication extends Document {
  @Prop({ default: 12345 })
  uniqueId?: number;

  @Prop()
  year?: string;

  @Prop()
  user: string;

  @Prop()
  universityDetails: string;

  @Prop({ default: 'Application submitted to the University' })
  status?: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UniversityApplicationSchema = SchemaFactory.createForClass(
  UniversityApplication,
);
