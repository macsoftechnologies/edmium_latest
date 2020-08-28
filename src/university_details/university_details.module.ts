import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollegeSchema } from './dto/university_details.schema';
import { SharedService } from 'src/shared/shared.service';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { UniversityDetailsController } from './university_details.controller';
import { UniversityDetailsService } from './university_details.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'College', schema: CollegeSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
    ]),
  ],
  controllers: [UniversityDetailsController],
  providers: [UniversityDetailsService, SharedService],
})
export class UniversityDetailsModule {}
