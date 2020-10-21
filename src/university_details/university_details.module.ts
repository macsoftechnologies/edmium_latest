import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityDetailsSchema } from './dto/university_details.schema';
import { SharedService } from 'src/shared/shared.service';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { UniversityDetailsController } from './university_details.controller';
import { UniversityDetailsService } from './university_details.service';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
    ]),
  ],
  controllers: [UniversityDetailsController],
  providers: [UniversityDetailsService, SharedService],
})
export class UniversityDetailsModule {}
