import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';
import { integer } from 'aws-sdk/clients/lightsail';

const defaultValue = { type: 'english' };

@Schema({ timestamps: true })
export class UserTests extends Document {
  @Prop()
  userId: string;

  @Prop()
  @IsOptional()
  gre: object;

  @Prop()
  @IsOptional()
  sat: object;

  @Prop()
  @IsOptional()
  gmat: object;

  @Prop()
  @IsOptional()
  act: object;

  @Prop()
  @IsOptional()
  ielts: object;

  @Prop()
  @IsOptional()
  pte: object;

  @Prop()
  @IsOptional()
  toefl: object;

  @Prop()
  @IsOptional()
  duolingo: object;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserTestsSchema = SchemaFactory.createForClass(UserTests);
