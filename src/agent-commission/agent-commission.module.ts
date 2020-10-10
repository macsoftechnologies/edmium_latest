import { Module } from '@nestjs/common';
import { AgentCommissionService } from './agent-commission.service';
import { AgentCommissionController } from './agent-commission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentCommissionSchema } from './dto/agent-commission.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { EducationSchema } from 'src/education/dto/education.schema';
import { SharedService } from 'src/shared/shared.service';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AgentCommission', schema: AgentCommissionSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'Education', schema: EducationSchema },
    ]),
  ],
  providers: [AgentCommissionService, SharedService],
  controllers: [AgentCommissionController],
})
export class AgentCommissionModule {}
