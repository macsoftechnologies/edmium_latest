import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApplicationStatusDto {
  @ApiProperty()
  @IsString()
  status: string;
}
