import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateUniversityDto {
  @ApiProperty()
  @IsString()
  universityName: string;
}

export class UpdateUniversityDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  universityName: string;
}

export class ListingUniversityDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  searchString: string;
}
