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
@Module({
  imports: [
    EducationModule,
    MongooseModule.forRoot('mongodb://localhost/edmium'),
    CourseModule,
    CountryModule,
    UniversityModule,
    UserModule,
    UniversityDetailsModule,
    IntakeModule,
  ],
  controllers: [AppController],
  providers: [AppService, SharedService],
})
export class AppModule {}
