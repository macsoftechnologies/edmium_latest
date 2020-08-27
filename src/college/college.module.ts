import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollegeSchema } from './dto/college.schema';
import { SharedService } from 'src/shared/shared.service';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'College', schema: CollegeSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
    ]),
  ],
  controllers: [CollegeController],
  providers: [CollegeService, SharedService],
})
export class CollegeModule {}
