import { Module } from '@nestjs/common';
import { AgentCommissionService } from './agent-commission.service';
import { AgentCommissionController } from './agent-commission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentCommissionSchema } from './dto/agent-commission.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { UniversitySchema } from 'src/university/dto/university.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'AgentCommission' , schema:AgentCommissionSchema} , {name:'Country' , schema:CountrySchema} ,{ name: 'University', schema: UniversitySchema }])],
  providers: [AgentCommissionService],
  controllers: [AgentCommissionController]
})
export class AgentCommissionModule {}
