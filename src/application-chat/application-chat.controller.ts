import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { ApplicationChatService } from './application-chat.service';
import { ApplicationChatDto } from './dto/application-chat.dto';

@Controller('application-chat')
export class ApplicationChatController {
  constructor(private applicationChatService: ApplicationChatService) {}

  //  Add Application Comment
  @Post()
  async addApplicationComment(@Body() body: ApplicationChatDto) {
    try {
      const response = this.applicationChatService.addApplicationComment(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  //    Get Application Chat
  @Get('/:applicationId')
  async getChatOfApplication(@Param('applicationId') applicationId: string) {
    try {
      const courses = await this.applicationChatService.getChatOfApplication(
        applicationId,
      );
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
