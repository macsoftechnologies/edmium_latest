import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserTestsDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsOptional()
  gre: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  sat: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  gmat: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  act: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  ielts: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  pte: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  toefl: {
    score: number;
  };

  @ApiProperty()
  @IsOptional()
  duolingo: {
    score: number;
  };
}

export class TestDto {
  @ApiProperty()
  @IsOptional()
  score: number;
}
