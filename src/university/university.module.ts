import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { UniversitySchema } from './dto/university.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';
import { UniversityApplicationSchema } from 'src/university-applications/dto/university-applications.schema';
import { UserSchema } from 'src/user/dto/user.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'University', schema: UniversitySchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'UniversityApplication', schema: UniversityApplicationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
    ]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService, SharedService],
})
export class UniversityModule {}
