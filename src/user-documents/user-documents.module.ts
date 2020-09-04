import { Module } from '@nestjs/common';
import { UserDocumentsController } from './user-documents.controller';
import { UserDocumentsService } from './user-documents.service';
import { SharedService } from 'src/shared/shared.service';
import { UserDocumentsSchema } from './dto/user-documents.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserDocuments', schema: UserDocumentsSchema },
    ]),
  ],
  controllers: [UserDocumentsController],
  providers: [UserDocumentsService, SharedService],
})
export class UserDocumentsModule {}
