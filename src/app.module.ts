import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationModule } from './education/education.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { CountryModule } from './country/country.module';
import { UniversityModule } from './university/university.module';
import { StudentModule } from './student/student.module';
import { CollegeModule } from './college/college.module';
import { SharedService } from './shared/shared.service';
@Module({
  imports: [
    EducationModule,
    MongooseModule.forRoot('mongodb://localhost/edmium'),
    CourseModule,
    CountryModule,
    UniversityModule,
    StudentModule,
    CollegeModule,
  ],
  controllers: [AppController],
  providers: [AppService, SharedService],
})
export class AppModule {}
