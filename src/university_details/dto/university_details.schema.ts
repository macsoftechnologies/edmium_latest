import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UniversityDetails extends Document {
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
  ieltsMax: number;

  @Prop()
  ieltsMin: number;

  @Prop()
  toeflMin: number;

  @Prop()
  toeflMax: number;

  @Prop()
  pteMax: number;

  @Prop()
  pteMin: number;

  @Prop()
  tuitionFee: string;

  @Prop()
  gre: string;

  @Prop()
  gmat: string;

  @Prop()
  englishTestsNotAcceptedByUniv: string;

  @Prop()
  sat: string;

  @Prop()
  backlogs: string;

  @Prop()
  englishTestWaiver: string;

  @Prop()
  aptitudeTestWaiver: string;

  @Prop()
  scholarshipAvailable: string;

  @Prop()
  scholarshipDetails: string;

  @Prop()
  entryRequirements: string;

  @Prop()
  remarks: string;

  @Prop()
  website: string;

  @Prop()
  studyLevel: string;
}

export const UniversityDetailsSchema = SchemaFactory.createForClass(
  UniversityDetails,
);

export interface IUniversityDetails extends Document {
  readonly university: string;
  readonly country: string;
  readonly course: string;
  readonly field: string;
  readonly concentration: string;
  readonly duration: string;
  readonly campus: string;
  readonly state: string;
  readonly intake: string;
  readonly ieltsMax: number;
  readonly ieltsMin: number;
  readonly toeflMin: number;
  readonly toeflMax: number;
  readonly pteMax: number;
  readonly pteMin: number;
  readonly tuitionFee: string;
  readonly gre: string;
  readonly gmat: string;
  readonly englishTestsNotAcceptedByUniv: string;
  readonly sat: string;
  readonly backlogs: string;
  readonly englishTestWaiver: string;
  readonly aptitudeTestWaiver: string;
  readonly scholarshipAvailable: string;
  readonly scholarshipDetails: string;
  readonly entryRequirements: string;
  readonly remarks: string;
  readonly website: string;
  readonly studyLevel: string;
}
