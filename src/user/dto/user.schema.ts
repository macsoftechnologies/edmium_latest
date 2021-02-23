import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';
import { integer } from 'aws-sdk/clients/lightsail';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  education: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  emailAddress: string;

  @Prop()
  mobileNumber: integer;

  @Prop()
  @IsOptional()
  password?: string;

  @Prop()
  countries: string[];

  @Prop()
  concentration: string;

  @Prop()
  role: string;

  @Prop()
  @IsOptional()
  favoriteUniversities?: object[];

  @Prop({ enum: ['male', 'female'] })
  @IsOptional()
  gender?: string;

  @Prop()
  @IsOptional()
  location?: string;

  @Prop()
  @IsOptional()
  profileImage?: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;

  @Prop({ default: false })
  @IsOptional()
  studentAssigned?: boolean;

  @Prop()
  @IsOptional()
  suggestedUniversities?: string[];

  @Prop({ default: 0 })
  @IsOptional()
  commission?: integer;

  @Prop({
    enum: ['paid', 'yet-to-pay', 'paid-partial', 'not-qualified'],
  })
  @IsOptional()
  commissionStatus?: string;

  @Prop({ default: 0 })
  @IsOptional()
  paidCommission?: integer;

  @Prop()
  assignedTo: string;

  @Prop({ default: 10 })
  @IsOptional()
  profileCompletionPercentage?: integer;

  @Prop()
  createdBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
