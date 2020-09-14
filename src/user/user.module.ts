import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'UserAuthentication', schema: UserAuthenticationSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, SharedService],
})
export class UserModule {}
