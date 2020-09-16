import { Module } from '@nestjs/common';
import { UniversityApplicationsController } from './university-applications.controller';
import { UniversityApplicationsService } from './university-applications.service';
import { UniversityApplicationSchema } from './dto/university-applications.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/dto/user.schema';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { ApplicationStatusService } from 'src/application-status/application-status.service';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UniversityApplication', schema: UniversityApplicationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
    ]),
  ],
  controllers: [UniversityApplicationsController],
  providers: [UniversityApplicationsService, ApplicationStatusService],
})
export class UniversityApplicationsModule {}
