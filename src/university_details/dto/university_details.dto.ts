import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class GetCollegeDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  universityId: string;
}

export class AddCollegeDto {
  @ApiProperty()
  @IsString()
  university: string;

  @ApiProperty()
  @IsString()
  country: string;
}

export class CollegeDto {
  @ApiProperty()
  @IsString()
  university: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsString()
  field: string;

  @ApiProperty()
  @IsString()
  concentration: string;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsString()
  campus: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  intake: string;

  @ApiProperty()
  @IsNumber()
  ieltsMax: number;

  @ApiProperty()
  @IsNumber()
  ieltsMin: number;

  @ApiProperty()
  @IsNumber()
  toeflMin: number;

  @ApiProperty()
  @IsNumber()
  toeflMax: number;

  @ApiProperty()
  @IsNumber()
  pteMax: number;

  @ApiProperty()
  @IsNumber()
  pteMin: number;

  @ApiProperty()
  @IsString()
  tuitionFee: string;

  @ApiProperty()
  @IsString()
  gre: string;

  @ApiProperty()
  @IsString()
  gmat: string;

  @ApiProperty()
  @IsString()
  englishTestsNotAcceptedByUniv: string;

  @ApiProperty()
  @IsString()
  sat: string;

  @ApiProperty()
  @IsString()
  backlogs: string;

  @ApiProperty()
  @IsString()
  englishTestWaiver: string;

  @ApiProperty()
  @IsString()
  aptitudeTestWaiver: string;

  @ApiProperty()
  @IsString()
  scholarshipAvailable: string;

  @ApiProperty()
  @IsString()
  scholarshipDetails: string;

  @ApiProperty()
  @IsString()
  entryRequirements: string;

  @ApiProperty()
  @IsString()
  remarks: string;

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty()
  @IsString()
  studyLevel: string;
}
export class SearchUniversitiesByIntCourUniNameDto {
  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsString()
  intake: string;
}

export class FilterByCourseDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  studyLevel: string;

  @ApiProperty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  englishTest: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  englishTestValue: number;
}
