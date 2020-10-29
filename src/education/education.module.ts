import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { EducationSchema } from './dto/education.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Education', schema: EducationSchema }]),
  ],
  controllers: [EducationController],
  providers: [EducationService, SharedService],
})
export class EducationModule {}
