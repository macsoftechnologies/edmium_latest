import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  specialization: string;
}

export class GetCoursesDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  specialization: string;
}
