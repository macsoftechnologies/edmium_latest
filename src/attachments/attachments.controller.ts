import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';
import { AttachmentsService } from './attachments.service';
import { AddAttachmentDto, GetAttachmentsDto } from './dto/attachments.dto';

@Controller('attachments')
export class AttachmentsController {
  constructor(
    private attachmentsService: AttachmentsService,
    private sharedService: SharedService,
  ) {}

  // Get User Attachments
  @Get('/user/:userId')
  async getUserAttachments(@Param('userId') userId: string) {
    try {
      let response = await this.attachmentsService.getAttachments({
        userId: userId,
        category: 'chat',
      });
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Country Attachments
  @Post('/country/:countryId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }]),
  )
  async addCountryAttachments(
    @Param('countryId') countryId: string,
    @Body() body: AddAttachmentDto,
    @UploadedFiles() files,
  ) {
    try {
      for (const attachment of files.attachments) {
        const res = await this.sharedService.uploadFileToAWSBucket(
          attachment,
          'country',
        );

        await this.attachmentsService.addAttachment({
          countryId: countryId,
          attachment: res.Location,
          category: 'country',
          ...body,
        });
      }

      return {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Request Successful',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Country Attachments
  @Post('/country/listing/:countryId')
  async getCountryAttachments(
    @Param('countryId') countryId: string,
    @Body() body: GetAttachmentsDto,
  ) {
    try {
      const params = await this.sharedService.prepareParams({
        countryId,
        ...body,
      });
      console.log(params);
      let response = await this.attachmentsService.get(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // // Add University Attachments
  // @Post('/university/:subCategory/:universityId')
  // @UseInterceptors(
  //   FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }]),
  // )
  // async addUniversityAttachments(
  //   @Param('subCategory') subCategory: string,
  //   @Param('universityId') universityId: string,
  //   @UploadedFiles() files,
  // ) {
  //   try {
  //     for (const attachment of files.attachments) {
  //       const res = await this.sharedService.uploadFileToAWSBucket(
  //         attachment,
  //         'university/' + subCategory,
  //       );

  //       await this.attachmentsService.addAttachment({
  //         universityId: universityId,
  //         attachment: res.Location,
  //         category: 'university',
  //         subCategory: subCategory,
  //       });
  //     }

  //     return {
  //       statusCode: HttpStatus.OK,
  //       data: null,
  //       message: 'Request Successful',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       errorMessage: error.message,
  //     };
  //   }
  // }

  // // Get Country Attachments
  // @Get('/university/:subCategory/:universityId')
  // async getUniversityAttachments(
  //   @Param('subCategory') subCategory: string,
  //   @Param('universityId') universityId: string,
  // ) {
  //   try {
  //     let response = await this.attachmentsService.getAttachments({
  //       universityId: universityId,
  //       category: 'university',
  //       subCategory: subCategory,
  //     });
  //     return response;
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       errorMessage: error.message,
  //     };
  //   }
  // }
}
