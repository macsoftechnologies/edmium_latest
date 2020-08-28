import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IntakeDto {
  @ApiProperty()
  @IsString()
  name: string;
}
