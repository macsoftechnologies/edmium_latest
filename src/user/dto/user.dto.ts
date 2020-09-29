import { IsString, IsNumber, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';

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
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  concentration: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  education: string;
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
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdBy: string;
}

export class UserLogin {
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
  userId: string;

  @ApiProperty()
  @IsString()
  universityId: string;
}

export class FilterStudentsDto extends PaginationDto {
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
  country: string[];

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
  @IsString()
  @IsOptional()
  country: string;

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
