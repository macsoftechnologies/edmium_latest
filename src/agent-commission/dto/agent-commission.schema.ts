import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class AgentCommission extends Document {
  @Prop({ required: true })
  university: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  education: string;

  @Prop({ required: true })
  commission: number;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const AgentCommissionSchema = SchemaFactory.createForClass(
  AgentCommission,
);
