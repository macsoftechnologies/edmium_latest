import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateSpecializationDto {
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

export class GetSpecializationsDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  concentration: string;

  @ApiProperty()
  @IsOptional()
  education: string;
}
