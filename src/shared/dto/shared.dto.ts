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
  orderBy: string;

  @ApiProperty()
  @IsString()
  sortBy: string;
}
