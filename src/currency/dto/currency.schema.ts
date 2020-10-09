import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { float } from 'aws-sdk/clients/lightsail';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Currency extends Document {
  @Prop()
  currency: string;

  @Prop()
  equivalentValueInINR: float;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
