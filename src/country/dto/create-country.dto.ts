import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty()
  @IsString()
  name: string;
}
