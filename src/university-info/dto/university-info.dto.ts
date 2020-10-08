import { IsString, IsOptional } from 'class-validator';
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
}

export class GetUniversityInfoDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  universityId: string;

  @ApiProperty()
  @IsString()
  category: string;
}
