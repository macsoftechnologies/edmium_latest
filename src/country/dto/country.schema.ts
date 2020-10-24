import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Country extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  currency: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
