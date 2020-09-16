import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ApplicationStatus extends Document {
  @Prop()
  status: string;

  @Prop()
  @IsOptional()
  parentStatus?: string;

  @Prop({ default: false })
  isParentStatus?: boolean;

  @Prop({ default: false })
  isDefault?: boolean;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const ApplicationStatusSchema = SchemaFactory.createForClass(
  ApplicationStatus,
);
