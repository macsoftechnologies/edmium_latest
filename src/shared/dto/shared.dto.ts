import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  start: number;

  @ApiProperty()
  @IsNumber()
  limit: number;
}
