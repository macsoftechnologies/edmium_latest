import { IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudent {
  @ApiProperty()
  @IsString()
  education: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty()
  @IsNumber()
  mobileNumber: number;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  course: string;
}

export class StudentLogin {
  @ApiProperty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class FavoriteListDto {
  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsString()
  universityId: string;
}
