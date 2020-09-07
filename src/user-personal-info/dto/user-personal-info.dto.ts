import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UserPersonalInfoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  emailAddress: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  mobileNumber: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  DOB: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  maritalStatus: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mailingAddress1: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mailingAddress2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mailingState: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mailingCountry: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mailingCity: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mailingPincode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  permanentAddress1: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  permanentAddress2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  permanentState: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  permanentCountry: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  permanentCity: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  permanentPincode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passportNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passportIssueDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passportExpiryDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passportIssueCountry: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passportCityOfBirth: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passportCountryOfBirth: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nationality: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  citizenship: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCitizenOfMoreThenOneCountry: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  otherCountryNationalities: string[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isLivingAndStudyingInAnyOtherCountry: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  presentLivingCountry: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  appliedForAnyOtherImmigration: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  otherImmigrationCountry: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  haveASeriousMedicalIssue: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  medicalIssue: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  visaRefusedForAnyCountry: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  visaRefusalCountry: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  typeOfVisa: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasACriminalOffence: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  criminalOffence: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emergencyContactName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emergencyContactPhone: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  emergencyContactEmail: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emergencyContactRelation: string;
}
