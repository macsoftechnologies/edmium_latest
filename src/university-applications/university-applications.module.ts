import { Module } from '@nestjs/common';
import { UniversityApplicationsController } from './university-applications.controller';
import { UniversityApplicationsService } from './university-applications.service';
import { UniversityApplicationSchema } from './dto/university-applications.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/dto/user.schema';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UniversityApplication', schema: UniversityApplicationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
    ]),
  ],
  controllers: [UniversityApplicationsController],
  providers: [UniversityApplicationsService],
})
export class UniversityApplicationsModule {}
