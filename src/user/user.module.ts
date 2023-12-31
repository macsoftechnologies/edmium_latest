import { HttpModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dto/user.schema';
import { EducationSchema } from 'src/education/dto/education.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { CourseSchema } from 'src/course/dto/course.schema';
import { UniversityDetailsService } from 'src/university_details/university_details.service';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { SharedService } from 'src/shared/shared.service';
import { UserAuthenticationSchema } from 'src/user-authentication/dto/user-authentication.schema';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';
import { ConcentrationSchema } from 'src/concentration/dto/concentration.schema';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationSchema } from 'src/notification/dto/notification.schema';
import { UpdateProfilePercentService } from 'src/update-profile-percent/update-profile-percent.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'Concentration', schema: ConcentrationSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'UserAuthentication', schema: UserAuthenticationSchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
      { name: 'Notifications', schema: NotificationSchema },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 50000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    SharedService,
    NotificationService,
    UpdateProfilePercentService,
  ],
})
export class UserModule {}
