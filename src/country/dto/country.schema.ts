import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Country extends Document {
  @Prop()
  name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

export interface ICountry extends Document {
  readonly name: string;
}
