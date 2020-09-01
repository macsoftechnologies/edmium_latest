import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationModule } from './education/education.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { CountryModule } from './country/country.module';
import { UniversityModule } from './university/university.module';
import { UserModule } from './user/user.module';
import { SharedService } from './shared/shared.service';
import { UniversityDetailsModule } from './university_details/university_details.module';
import { IntakeModule } from './intake/intake.module';
import { UserPersonalInfoModule } from './user-personal-info/user-personal-info.module';
import { UserAcademicInfoModule } from './user-academic-info/user-academic-info.module';
import { UserWorkInfoModule } from './user-work-info/user-work-info.module';
import { UniversityApplicationsModule } from './university-applications/university-applications.module';
@Module({
  imports: [
    EducationModule,
    // MongooseModule.forRoot('mongodb://localhost/edmium'),
    MongooseModule.forRoot(
      'mongodb://adimn:VakK8jKrS6T1XwqB3QyvbywWiudfbP773eZ9wg5egE0=@13.235.254.226:27017/edmium?authSource=admin',
    ),
    CourseModule,
    CountryModule,
    UniversityModule,
    UserModule,
    UniversityDetailsModule,
    IntakeModule,
    UserPersonalInfoModule,
    UserAcademicInfoModule,
    UserWorkInfoModule,
    UniversityApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SharedService],
})
export class AppModule {}
