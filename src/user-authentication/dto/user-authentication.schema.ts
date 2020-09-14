import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserAuthentication extends Document {
  @Prop()
  user: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserAuthenticationSchema = SchemaFactory.createForClass(
  UserAuthentication,
);
