import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserAttachmentsService } from './user-attachments.service';

@Controller('user-attachments')
export class UserAttachmentsController {
  constructor(private userAttachmentsService: UserAttachmentsService) {}

  /* Create User  */
  @Get('/:userId')
  async createUser(@Param('userId') userId: string) {
    try {
      let response = await this.userAttachmentsService.fetchAll(userId);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
