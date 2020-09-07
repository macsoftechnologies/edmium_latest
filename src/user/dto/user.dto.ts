import { IsString, IsNumber, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class CreateUser {
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
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  intake: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  searchString: string;
}
