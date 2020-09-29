import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  start: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sortOrder: string;
}

export class FetchParamsDto {
  paginationObject: PaginationDto;
  findObject: object;
}
