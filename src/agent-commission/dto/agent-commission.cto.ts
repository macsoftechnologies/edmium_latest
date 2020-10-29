import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CommissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  university: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  education: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  commission: number;
}

export class CommissionUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  commissionId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  commission: number;
}
