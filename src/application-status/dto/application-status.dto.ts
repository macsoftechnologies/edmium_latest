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

  @ApiProperty({ default: false })
  isParentStatus: boolean;

  @ApiProperty({ default: false })
  isDefault: boolean;

  @ApiProperty({ default: false })
  applicationClosed: boolean;

  @ApiProperty({ default: false })
  initiateCommission: boolean;
}
