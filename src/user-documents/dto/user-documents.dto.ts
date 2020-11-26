import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddDocumentDto {
  @ApiProperty()
  @IsString()
  documentType: string;

  @ApiProperty()
  @IsString()
  fileType: string;
}
