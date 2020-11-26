import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

enum type {
  'to-do' = 'to-do',
  'notification' = 'notification',
}

export class NotificationDto {
  usersTo: string[];
  notification: NotificationObject;
  registration_ids?: string[];
}

export class NotificationObject {
  action: string;
  title: string;
  body: string;
}

export class CreateNotificationObject {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;
}

export class CreateNotificationDto {
  @ApiProperty()
  @IsArray()
  usersTo: string[];

  @ApiProperty()
  notification: CreateNotificationObject;
}

export class UpdateNotificationDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isRead: boolean;
}

export class NotificationsListingDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(type)
  type: string;
}
