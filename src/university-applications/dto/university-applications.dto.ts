import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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
