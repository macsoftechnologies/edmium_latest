import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityDetailsSchema } from './dto/university_details.schema';
import { SharedService } from 'src/shared/shared.service';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { UniversityDetailsController } from './university_details.controller';
import { UniversityDetailsService } from './university_details.service';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';
import { CourseService } from 'src/course/course.service';
import { ConcentrationService } from 'src/concentration/concentration.service';
import { ConcentrationSchema } from 'src/concentration/dto/concentration.schema';
import { CourseSchema } from 'src/course/dto/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
      { name: 'Concentration', schema: ConcentrationSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [UniversityDetailsController],
  providers: [
    UniversityDetailsService,
    SharedService,
    ConcentrationService,
    CourseService,
  ],
})
export class UniversityDetailsModule {}
