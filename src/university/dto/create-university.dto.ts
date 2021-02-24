import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateUniversityDto {
  @ApiProperty()
  @IsString()
  universityName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  website: string;
}

export class UpdateUniversityDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  universityName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  website: string;
}

export class ListingUniversityDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  searchString: string;
}
