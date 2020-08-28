import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class College extends Document {
  @Prop()
  university: string;

  @Prop()
  country: string;

  @Prop()
  course: string;

  @Prop()
  field: string;

  @Prop()
  concentration: string;

  @Prop()
  duration: string;

  @Prop()
  campus: string;

  @Prop()
  state: string;

  @Prop()
  intake: string;

  @Prop()
  IELTS: number;

  @Prop()
  band_min: number;

  @Prop()
  toefl_min: number;

  @Prop()
  toefl_max: number;

  @Prop()
  PTE: number;

  @Prop()
  PTE_min: number;

  @Prop()
  tuition_fee: string;

  @Prop()
  GRE: string;

  @Prop()
  GMAT: string;

  @Prop()
  english_tests_not_accepted_by_UNIV: string;

  @Prop()
  SAT: string;

  @Prop()
  backlogs: string;

  @Prop()
  english_test_waiver: string;

  @Prop()
  aptitude_test_waiver: string;

  @Prop()
  scholarship_available: string;

  @Prop()
  scholarship_details: string;

  @Prop()
  entry_requirements: string;

  @Prop()
  remarks: string;

  @Prop()
  website: string;

  @Prop()
  study_level: string;
}

export const CollegeSchema = SchemaFactory.createForClass(College);

export interface ICollege extends Document {
  readonly university: string;
  readonly country: string;
  readonly course: string;
  readonly field: string;
  readonly concentration: string;
  readonly duration: string;
  readonly campus: string;
  readonly state: string;
  readonly intake: string;
  readonly IELTS: number;
  readonly band_min: number;
  readonly toefl_min: number;
  readonly toefl_max: number;
  readonly PTE: number;
  readonly PTE_min: number;
  readonly tuition_fee: string;
  readonly GRE: string;
  readonly GMAT: string;
  readonly english_tests_not_accepted_by_UNIV: string;
  readonly SAT: string;
  readonly backlogs: string;
  readonly english_test_waiver: string;
  readonly aptitude_test_waiver: string;
  readonly scholarship_available: string;
  readonly scholarship_details: string;
  readonly entry_requirements: string;
  readonly remarks: string;
  readonly website: string;
  readonly study_level: string;
}
