import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { SharedService } from 'src/shared/shared.service';
import {
  CreateUniversityInfoDto,
  GetUniversityInfoDto,
} from './dto/university-info.dto';
import { UniversityInfoService } from './university-info.service';

@Controller('universityInfo')
export class UniversityInfoController {
  constructor(
    private readonly universityInfoService: UniversityInfoService,
    private sharedService: SharedService,
    private attachmentsService: AttachmentsService,
  ) {}

  //   Create University Info
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachment', maxCount: 1 }]))
  async createUniversityInfo(
    @Body() body: CreateUniversityInfoDto,
    @UploadedFiles() files,
  ) {
    try {
      const params: any = body;
      if (files && files.attachment) {
        const attachment = await this.sharedService.uploadFileToAWSBucket(
          files.attachment[0],
          'university-info',
        );

        const attachmentObject = await this.attachmentsService.addAttachment({
          universityId: params.universityId,
          attachment: attachment.Location,
          category: 'university-info',
        });

        params.attachment = attachmentObject.data._id;
      }

      const response = this.universityInfoService.createUniversityInfo(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  /* Get University Info */
  @Post('listing')
  async getEducationByID(@Body() body: GetUniversityInfoDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      console.log(params);
      let response = await this.universityInfoService.getUniversityInfo(params);
      console.log(response);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  //   Create University Info
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachment', maxCount: 1 }]))
  async updateUniversityInfo(
    @Param('id') id: string,
    @Body() body: CreateUniversityInfoDto,
    @UploadedFiles() files,
  ) {
    try {
      const params: any = body;
      if (files.attachment) {
        const attachment = await this.sharedService.uploadFileToAWSBucket(
          files.attachment[0],
          'university-info',
        );

        const attachmentObject = await this.attachmentsService.addAttachment({
          universityId: params.universityId,
          attachment: attachment.Location,
          category: 'university-info',
        });

        params.attachment = attachmentObject.data._id;
      }

      const response = this.universityInfoService.updateUniversityInfo(
        id,
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  // Delete University Info
  @Delete('/:id')
  async deleteCounselor(@Param('id') id: string) {
    try {
      let response = await this.universityInfoService.updateUniversityInfo(id, {
        isDeleted: true,
      });
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
