import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class UniversityApplicationDto {
  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  universityDetails: string;
}

export class ApplicationsOfStudentDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  user: string;
}

export class ApplicationsFilterDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  fromDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  toDate: string;

  @ApiProperty()
  @IsOptional()
  status: string[];

  @ApiProperty()
  @IsOptional()
  university: string[];

  @ApiProperty()
  @IsOptional()
  intake: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  searchString: string;
}

export class UpdateStatusDto {
  @ApiProperty()
  @IsString()
  status: string;
}
