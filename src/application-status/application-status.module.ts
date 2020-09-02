import { Module } from '@nestjs/common';
import { ApplicationStatusController } from './application-status.controller';
import { ApplicationStatusService } from './application-status.service';
import { ApplicationStatusSchema } from './dto/application-status.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ApplicationStatus', schema: ApplicationStatusSchema },
    ]),
  ],
  controllers: [ApplicationStatusController],
  providers: [ApplicationStatusService],
})
export class ApplicationStatusModule {}
