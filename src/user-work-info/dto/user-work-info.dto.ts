import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UserWorkInfoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  nameOfOrganization: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  jobProfile: string;

  @ApiProperty()
  @IsString()
  workingFrom: string;

  @ApiProperty()
  @IsString()
  workingUpTo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  modeOfSalary: string;

  @ApiProperty()
  @IsBoolean()
  currentlyWorkingHere: boolean;
}
