import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class UserPersonalInfo extends Document {
  @Prop()
  userId: string;

  @Prop()
  @IsOptional()
  DOB: string;

  @Prop()
  @IsOptional()
  gender: string;

  @Prop()
  @IsOptional()
  maritalStatus: string;

  @Prop()
  @IsOptional()
  mailingAddress1: string;

  @Prop()
  @IsOptional()
  mailingAddress2: string;

  @Prop()
  @IsOptional()
  mailingState: string;

  @Prop()
  @IsOptional()
  mailingCountry: string;

  @Prop()
  @IsOptional()
  mailingCity: string;

  @Prop()
  @IsOptional()
  mailingPincode: string;

  @Prop()
  @IsOptional()
  permanentAddress1: string;

  @Prop()
  @IsOptional()
  permanentAddress2: string;

  @Prop()
  @IsOptional()
  permanentState: string;

  @Prop()
  @IsOptional()
  permanentCountry: string;

  @Prop()
  @IsOptional()
  permanentCity: string;

  @Prop()
  @IsOptional()
  permanentPincode: string;

  @Prop()
  @IsOptional()
  passportNumber: string;

  @Prop()
  @IsOptional()
  passportIssueDate: string;

  @Prop()
  @IsOptional()
  passportExpiryDate: string;

  @Prop()
  @IsOptional()
  passportIssueCountry: string;

  @Prop()
  @IsOptional()
  passportCityOfBirth: string;

  @Prop()
  @IsOptional()
  passportCountryOfBirth: string;

  @Prop()
  @IsOptional()
  nationality: string;

  @Prop()
  @IsOptional()
  citizenship: string;

  @Prop()
  @IsOptional()
  isCitizenOfMoreThenOneCountry: boolean;

  @Prop()
  @IsOptional()
  otherCountryNationalities: string[];

  @Prop()
  @IsOptional()
  isLivingAndStudyingInAnyOtherCountry: boolean;

  @Prop()
  @IsOptional()
  presentLivingCountry: string;

  @Prop()
  @IsOptional()
  appliedForAnyOtherImmigration: boolean;

  @Prop()
  @IsOptional()
  otherImmigrationCountry: string;

  @Prop()
  @IsOptional()
  haveASeriousMedicalIssue: boolean;

  @Prop()
  @IsOptional()
  medicalIssue: string;

  @Prop()
  @IsOptional()
  visaRefusedForAnyCountry: boolean;

  @Prop()
  @IsOptional()
  visaRefusalCountry: string;

  @Prop()
  @IsOptional()
  typeOfVisa: string;

  @Prop()
  @IsOptional()
  hasACriminalOffence: boolean;

  @Prop()
  @IsOptional()
  criminalOffence: string;

  @Prop()
  @IsOptional()
  emergencyContactName: string;

  @Prop()
  @IsOptional()
  emergencyContactPhone: string;

  @Prop()
  @IsOptional()
  emergencyContactEmail: string;

  @Prop()
  @IsOptional()
  emergencyContactRelation: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserPersonalInfoSchema = SchemaFactory.createForClass(
  UserPersonalInfo,
);
