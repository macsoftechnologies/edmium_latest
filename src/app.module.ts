import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationModule } from './education/education.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { CountryModule } from './country/country.module';
import { UniversityModule } from './university/university.module';
import { UserModule } from './user/user.module';
import { UniversityDetailsModule } from './university_details/university_details.module';
import { IntakeModule } from './intake/intake.module';
import { UserPersonalInfoModule } from './user-personal-info/user-personal-info.module';
import { UserAcademicInfoModule } from './user-academic-info/user-academic-info.module';
import { UserWorkInfoModule } from './user-work-info/user-work-info.module';
import { UniversityApplicationsModule } from './university-applications/university-applications.module';
import { ApplicationStatusModule } from './application-status/application-status.module';
import { ApplicationChatModule } from './application-chat/application-chat.module';
import { UserDocumentsModule } from './user-documents/user-documents.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { ToDoModule } from './to-do/to-do.module';
import { ConcentrationModule } from './concentration/concentration.module';
import { NotificationModule } from './notification/notification.module';
import { AgentCommissionModule } from './agent-commission/agent-commission.module';
import { UniversityInfoModule } from './university-info/university-info.module';
import { CommissionTransactionsModule } from './commission-transactions/commission-transactions.module';
import { CurrencyModule } from './currency/currency.module';
import { UserTestsModule } from './user-tests/user-tests.module';
import { UpdateProfilePercentModule } from './update-profile-percent/update-profile-percent.module';
import { ReminderModule } from './reminder/reminder.module';
import { CronModule } from './cron/cron.module';
import { SpecializationModule } from './specialization/specialization.module';
@Module({
  imports: [
    EducationModule,
    // MongooseModule.forRoot('mongodb://localhost/edmium'),
    //mongodb://adimn:VakK8jKrS6T1XwqB3QyvbywWiudfbP773eZ9wg5egE0=@13.235.254.226:27017/edmium?authSource=admin
    //mongodb://admin:rOzgzJcIqT@65.2.12.162:27017/edmium?authSource=admin
    MongooseModule.forRoot(
      //'mongodb://adimn:VakK8jKrS6T1XwqB3QyvbywWiudfbP773eZ9wg5egE0=@13.235.254.226:27017/edmium?authSource=admin',
      'mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/edmium?retryWrites=true&w=majority'
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
    ApplicationStatusModule,
    ApplicationChatModule,
    UserDocumentsModule,
    UserAuthenticationModule,
    AttachmentsModule,
    ToDoModule,
    ConcentrationModule,
    NotificationModule,
    AgentCommissionModule,
    UniversityInfoModule,
    CommissionTransactionsModule,
    CurrencyModule,
    UserTestsModule,
    UpdateProfilePercentModule,
    ReminderModule,
    CronModule,
    SpecializationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
