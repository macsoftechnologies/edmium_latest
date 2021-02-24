import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { SpecializationSchema } from './dto/specialization.schema';
import { SpecializationController } from './specialization.controller';
import { SpecializationService } from './specialization.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Specialization', schema: SpecializationSchema },
    ]),
  ],
  controllers: [SpecializationController],
  providers: [SpecializationService, SharedService],
})
export class SpecializationModule {}
