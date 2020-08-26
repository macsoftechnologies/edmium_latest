import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUniversityDto {
  @ApiProperty()
  @IsString()
  universityName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  universityProfileImg: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  universityBackgroundProfileImg: string;
}
