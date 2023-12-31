import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateUniversityInfoDto {
  @ApiProperty()
  @IsString()
  universityId: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  concentration: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  courses: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  informationLink: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  eventDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fileType: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fileName: string;
}

export class GetUniversityInfoDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  universityId: string;

  @ApiProperty()
  @IsString()
  category: string;
}
