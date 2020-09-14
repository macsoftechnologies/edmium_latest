import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserDocuments extends Document {
  @Prop()
  userId: string;

  @Prop()
  @IsOptional()
  markSheet_10th?: string;

  @Prop()
  @IsOptional()
  markSheet_11th?: string;

  @Prop()
  @IsOptional()
  markSheet_12th?: string;

  @Prop()
  @IsOptional()
  academicTranscripts?: string;

  @Prop()
  @IsOptional()
  applicationForm?: string;

  @Prop()
  @IsOptional()
  feePaymentConfirmationPage?: string;

  @Prop()
  @IsOptional()
  declaration?: string;

  @Prop()
  @IsOptional()
  copyOfPassport?: string;

  @Prop()
  @IsOptional()
  statementOfPurpose?: string;

  @Prop()
  @IsOptional()
  cv?: string;

  @Prop()
  @IsOptional()
  letterOfRecommendation?: string;

  @Prop()
  @IsOptional()
  englishLanguageCertificate?: string;

  @Prop()
  @IsOptional()
  bankBalanceCertificate?: string;

  @Prop()
  @IsOptional()
  financialAffidavit?: string;

  @Prop()
  @IsOptional()
  internshipCertificate?: string;

  @Prop()
  @IsOptional()
  detailsOfExtraCurricular?: string;

  @Prop()
  @IsOptional()
  mediumOfInstructionLetter?: string;

  @Prop()
  @IsOptional()
  gapExplanationLetter?: string;

  @Prop()
  @IsOptional()
  birthCertificate?: string;

  @Prop()
  @IsOptional()
  onlineSubmissionConfirmationPage?: string;

  @Prop()
  @IsOptional()
  gre?: string;

  @Prop()
  @IsOptional()
  additionalDocuments?: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserDocumentsSchema = SchemaFactory.createForClass(UserDocuments);
