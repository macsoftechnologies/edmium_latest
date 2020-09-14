import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional, IsBoolean } from 'class-validator';

@Schema({ timestamps: true })
export class UserWorkInfo extends Document {
  @Prop()
  userId: string;

  @Prop()
  nameOfOrganization: string;

  @Prop()
  position: string;

  @Prop()
  @IsOptional()
  jobProfile: string;

  @Prop()
  workingFrom: string;

  @Prop()
  workingUpTo: string;

  @Prop()
  @IsOptional()
  modeOfSalary: string;

  @Prop()
  currentlyWorkingHere: boolean;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserWorkInfoSchema = SchemaFactory.createForClass(UserWorkInfo);
