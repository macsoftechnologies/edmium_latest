import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

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
  mobileNumber: number;

  @Prop()
  password: string;

  @Prop()
  country: string;

  @Prop()
  course: string;

  @Prop()
  role: string;

  @Prop()
  @IsOptional()
  favoriteUniversities?: object[];

  @Prop()
  @IsOptional()
  profileImage?: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUser extends Document {
  readonly education: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly mobileNumber: number;
  readonly password: string;
  readonly country: string;
  readonly course: string;
  readonly role: string;
}
