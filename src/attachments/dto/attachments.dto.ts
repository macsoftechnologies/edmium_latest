import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

export class AddAttachmentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fileType: string;
}

export class GetAttachmentsDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
