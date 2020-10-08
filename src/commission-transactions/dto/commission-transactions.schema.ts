import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CommissionTransactions extends Document {
  @Prop({required : true})
  user: string;

  @Prop({required : true})
  applicationId: string

  @Prop({required : true})
  estimatedAmount: number

  @Prop({required : true , default : 0})
  actualAmount: number

  @Prop({required : true})
  countryId : string

  @Prop({ default: false })
  @IsOptional()
  isActualAmount?: boolean;

  @Prop({ default: true })
  @IsOptional()
  isEstimatedAmount?: boolean;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const CommissionTransactionsSchema = SchemaFactory.createForClass(CommissionTransactions);
