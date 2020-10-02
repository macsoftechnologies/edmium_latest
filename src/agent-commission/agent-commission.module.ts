import { Module } from '@nestjs/common';
import { AgentCommissionService } from './agent-commission.service';
import { AgentCommissionController } from './agent-commission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentCommissionSchema } from './dto/agent-commission.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { EducationSchema } from 'src/education/dto/education.schema';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AgentCommission', schema: AgentCommissionSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Education', schema: EducationSchema },
    ]),
  ],
  providers: [AgentCommissionService, SharedService],
  controllers: [AgentCommissionController],
})
export class AgentCommissionModule {}
