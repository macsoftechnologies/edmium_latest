import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  concentration: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  education: string;
}

export class GetCoursesDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  concentration: string;

  @ApiProperty()
  @IsOptional()
  education: string;
}
