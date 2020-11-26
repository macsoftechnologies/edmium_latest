import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Param,
  Get,
} from '@nestjs/common';
import { UserDocumentsService } from './user-documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';
import { AddDocumentDto } from './dto/user-documents.dto';

@Controller('user-documents')
export class UserDocumentsController {
  constructor(
    private userDocumentsService: UserDocumentsService,
    private sharedService: SharedService,
  ) {}

  //   Add User Documents
  @Post('/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async addUserDocuments(
    @Body() body: AddDocumentDto,
    @UploadedFile() file,
    @Param('userId') userId: string,
  ) {
    try {
      console.log(body);
      const document = await this.sharedService.uploadFileToAWSBucket(
        file,
        'user/document',
      );

      const params = { userId: userId };
      params[body.documentType] = {
        path: document.Location,
        fileType: body.fileType,
      };
      let response = await this.userDocumentsService.addUserDocuments(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Documents
  @Get('/:userId')
  async getUserPersonalInfoByUserId(@Param('userId') userId: string) {
    try {
      let response = await this.userDocumentsService.getUserDocuments(userId);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
