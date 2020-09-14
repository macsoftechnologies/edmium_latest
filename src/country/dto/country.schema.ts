import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Country extends Document {
  @Prop()
  name: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

export interface ICountry extends Document {
  readonly name: string;
}
