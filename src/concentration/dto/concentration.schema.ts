import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Concentration extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const ConcentrationSchema = SchemaFactory.createForClass(Concentration);
