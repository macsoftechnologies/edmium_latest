import { Module } from '@nestjs/common';
import { ConcentrationService } from './concentration.service';
import { ConcentrationController } from './concentration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcentrationSchema } from './dto/concentration.schema';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Concentration', schema: ConcentrationSchema },
    ]),
  ],
  providers: [ConcentrationService, SharedService],
  controllers: [ConcentrationController],
})
export class ConcentrationModule {}
