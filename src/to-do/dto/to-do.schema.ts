import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ToDo extends Document {
  @Prop()
  user: string;

  @Prop()
  message: string;

  @Prop({ default: 'Pending' })
  @IsOptional()
  status?: string;

  @Prop()
  @IsOptional()
  type?: string;

  @Prop()
  @IsOptional()
  student?: string;

  @Prop()
  @IsOptional()
  application?: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;

  @Prop()
  @IsOptional()
  createdBy: string;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);
