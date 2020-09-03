import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { UniversitySchema } from './dto/university.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'University', schema: UniversitySchema },
    ]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService, SharedService],
})
export class UniversityModule {}
