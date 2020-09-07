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
  status: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  course: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  intake: string;

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
