import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class GetCollegeDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  university_id: string;
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
  IELTS: number;

  @ApiProperty()
  @IsNumber()
  band_min: number;

  @ApiProperty()
  @IsNumber()
  toefl_min: number;

  @ApiProperty()
  @IsNumber()
  toefl_max: number;

  @ApiProperty()
  @IsNumber()
  PTE: number;

  @ApiProperty()
  @IsNumber()
  PTE_min: number;

  @ApiProperty()
  @IsString()
  tuition_fee: string;

  @ApiProperty()
  @IsString()
  GRE: string;

  @ApiProperty()
  @IsString()
  GMAT: string;

  @ApiProperty()
  @IsString()
  english_tests_not_accepted_by_UNIV: string;

  @ApiProperty()
  @IsString()
  SAT: string;

  @ApiProperty()
  @IsString()
  backlogs: string;

  @ApiProperty()
  @IsString()
  english_test_waiver: string;

  @ApiProperty()
  @IsString()
  aptitude_test_waiver: string;

  @ApiProperty()
  @IsString()
  scholarship_available: string;

  @ApiProperty()
  @IsString()
  scholarship_details: string;

  @ApiProperty()
  @IsString()
  entry_requirements: string;

  @ApiProperty()
  @IsString()
  remarks: string;

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty()
  @IsString()
  study_level: string;
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
