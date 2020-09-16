import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ApplicationStatusDto {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  parentStatus: string;

  @ApiProperty()
  isParentStatus: boolean;

  @ApiProperty()
  isDefault: boolean;
}
