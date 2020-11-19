import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateReminderDto {
  @ApiProperty()
  @IsString()
  notification: string;

  @ApiProperty()
  @IsString()
  dateTime: Date;
}
