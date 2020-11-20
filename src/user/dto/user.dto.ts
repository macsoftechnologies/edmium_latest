import {
  IsString,
  IsNumber,
  IsEmail,
  IsOptional,
  IsEnum,
  isNumber,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';

enum gender {
  'male' = 'male',
  'female' = 'female',
}

enum commissionStatus {
  'paid' = 'paid',
  'yet-to-pay' = 'yet-to-pay',
  'paid-partial' = 'paid-partial',
  'not-qualified' = 'not-qualified',
}

export class CreateUser {
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
  @IsOptional()
  @IsArray()
  countries: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  concentration: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  education: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(gender)
  gender: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  deviceToken: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  deviceType: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdBy: string;
}

export class AddCounselorDto {
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
  @IsOptional()
  @IsArray()
  countries: string[];

  @ApiProperty()
  @IsString()
  deviceToken: string;

  @ApiProperty()
  @IsString()
  deviceType;

  @ApiProperty()
  @IsString()
  createdBy: string;
}

export class UpdateCounselorDto {
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
  @IsOptional()
  @IsArray()
  countries: string[];

  @ApiProperty()
  @IsString()
  deviceToken: string;

  @ApiProperty()
  @IsString()
  deviceType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdBy: string;
}

export class UpdateCommissionStatus {
  @ApiProperty()
  @IsString()
  @IsEnum(commissionStatus)
  commissionStatus: string;

  @ApiProperty()
  @IsNumber()
  commission: number;
}

export class UserLogin {
  @ApiProperty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  deviceToken: string;

  @ApiProperty()
  @IsString()
  deviceType: string;
}

export class FavoriteListDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  universityId: string;
}

export class FilterStudentsDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fromDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  toDate: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  intake: string[];

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  status: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  searchString: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsOptional()
  tests: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  numberOfBacklogs: number;

  @ApiProperty({ type: 'integer', isArray: true })
  @IsOptional()
  yearOfPassing: number[];
}

export class SwitchFavoriteUniversityRanksDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  universityDetailsId1: string;

  @ApiProperty()
  @IsString()
  universityDetailsId2: string;
}

export class AssignStudentToCounselorDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  counselorId: string;
}

export class RegisterStudentDto {
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
  @IsOptional()
  @IsArray()
  countries: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  concentration: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  education: string;

  @ApiProperty()
  @IsString()
  createdBy: string;
}

export class FetchUsersDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  role: string;
}

export class changePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
