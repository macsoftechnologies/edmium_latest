import { ApiProperty } from '@nestjs/swagger';
import { float } from 'aws-sdk/clients/lightsail';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNumber()
  equivalentValueInINR: float;
}
