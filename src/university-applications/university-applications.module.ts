import { HttpModule, HttpService, Module } from '@nestjs/common';
import { UniversityApplicationsController } from './university-applications.controller';
import { UniversityApplicationsService } from './university-applications.service';
import { UniversityApplicationSchema } from './dto/university-applications.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/dto/user.schema';
import { UniversityDetailsSchema } from 'src/university_details/dto/university_details.schema';
import { UniversitySchema } from 'src/university/dto/university.schema';
import { CountrySchema } from 'src/country/dto/country.schema';
import { ApplicationStatusService } from 'src/application-status/application-status.service';
import { ApplicationStatusSchema } from 'src/application-status/dto/application-status.schema';
import { CommissionTransactionsSchema } from 'src/commission-transactions/dto/commission-transactions.schema';
import { CommissionTransactionsService } from 'src/commission-transactions/commission-transactions.service';
import { UniversityDetailsService } from 'src/university_details/university_details.service';
import { AgentCommissionService } from 'src/agent-commission/agent-commission.service';
import { AgentCommissionSchema } from 'src/agent-commission/dto/agent-commission.schema';
import { EducationSchema } from 'src/education/dto/education.schema';
import { CountryService } from 'src/country/country.service';
import { CurrencySchema } from 'src/currency/dto/currency.schema';
import { SharedService } from 'src/shared/shared.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationSchema } from 'src/notification/dto/notification.schema';
import { UserAuthenticationSchema } from 'src/user-authentication/dto/user-authentication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UniversityApplication', schema: UniversityApplicationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UniversityDetails', schema: UniversityDetailsSchema },
      { name: 'University', schema: UniversitySchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
      { name: 'CommissionTransactions', schema: CommissionTransactionsSchema },
      { name: 'AgentCommission', schema: AgentCommissionSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Currency', schema: CurrencySchema },
      { name: 'Notifications', schema: NotificationSchema },
      { name: 'UserAuthentication', schema: UserAuthenticationSchema },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 50000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [UniversityApplicationsController],
  providers: [
    UniversityApplicationsService,
    ApplicationStatusService,
    CommissionTransactionsService,
    UniversityDetailsService,
    AgentCommissionService,
    CountryService,
    SharedService,
    NotificationService,
  ],
})
export class UniversityApplicationsModule {}
