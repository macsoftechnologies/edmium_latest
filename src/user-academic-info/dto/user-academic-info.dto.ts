import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UserAcademicInfoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  levelOfStudy: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  otherInstitute: boolean;

  @ApiProperty()
  @IsString()
  nameOfInstitution: string;

  @ApiProperty()
  @IsString()
  cityOfStudy: string;

  @ApiProperty()
  @IsString()
  countryOfStudy: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  qualificationAchieved: string;

  @ApiProperty()
  @IsString()
  scoreType: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  primaryLanguage: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  numberOfBacklogs: number;

  @ApiProperty()
  @IsNumber()
  yearOfPassing: number;
}
