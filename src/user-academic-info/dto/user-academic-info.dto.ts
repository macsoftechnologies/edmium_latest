import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UserAcademicInfoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  levelOfStudy: string;

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
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsString()
  primaryLanguage: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsNumber()
  numberOfBacklogs: number;

  @ApiProperty()
  @IsString()
  endDate: string;
}
