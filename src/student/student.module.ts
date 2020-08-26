import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './dto/student.schema';
import { EducationSchema } from 'src/education/dto/education.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { CourseSchema } from 'src/course/dto/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
