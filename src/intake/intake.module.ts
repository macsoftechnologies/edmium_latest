import { Module } from '@nestjs/common';
import { IntakeController } from './intake.controller';
import { IntakeService } from './intake.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { IntakeSchema } from './dto/intake.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Intake', schema: IntakeSchema }]),
  ],
  controllers: [IntakeController],
  providers: [IntakeService],
})
export class IntakeModule {}
