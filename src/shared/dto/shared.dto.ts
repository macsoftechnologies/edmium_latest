import { IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsString()
  limit: string;

  @ApiProperty()
  @IsString()
  order_by: string;

  @ApiProperty()
  @IsString()
  sort_order: string;
}
