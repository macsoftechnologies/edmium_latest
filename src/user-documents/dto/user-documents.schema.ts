import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserDocuments extends Document {
  @Prop()
  userId: string;

  @Prop()
  @IsOptional()
  markSheet_10th?: FileObject;

  @Prop()
  @IsOptional()
  markSheet_11th?: FileObject;

  @Prop()
  @IsOptional()
  markSheet_12th?: FileObject;

  @Prop()
  @IsOptional()
  academicTranscripts?: FileObject;

  @Prop()
  @IsOptional()
  applicationForm?: FileObject;

  @Prop()
  @IsOptional()
  feePaymentConfirmationPage?: FileObject;

  @Prop()
  @IsOptional()
  declaration?: FileObject;

  @Prop()
  @IsOptional()
  copyOfPassport?: FileObject;

  @Prop()
  @IsOptional()
  statementOfPurpose?: FileObject;

  @Prop()
  @IsOptional()
  cv?: FileObject;

  @Prop()
  @IsOptional()
  letterOfRecommendation?: FileObject;

  @Prop()
  @IsOptional()
  englishLanguageCertificate?: FileObject;

  @Prop()
  @IsOptional()
  bankBalanceCertificate?: FileObject;

  @Prop()
  @IsOptional()
  financialAffidavit?: FileObject;

  @Prop()
  @IsOptional()
  internshipCertificate?: FileObject;

  @Prop()
  @IsOptional()
  detailsOfExtraCurricular?: FileObject;

  @Prop()
  @IsOptional()
  mediumOfInstructionLetter?: FileObject;

  @Prop()
  @IsOptional()
  gapExplanationLetter?: FileObject;

  @Prop()
  @IsOptional()
  birthCertificate?: FileObject;

  @Prop()
  @IsOptional()
  onlineSubmissionConfirmationPage?: FileObject;

  @Prop()
  @IsOptional()
  gre?: FileObject;

  @Prop()
  @IsOptional()
  additionalDocuments?: FileObject;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export interface FileObject {
  path: string;
  fileType: string;
}

export const UserDocumentsSchema = SchemaFactory.createForClass(UserDocuments);
