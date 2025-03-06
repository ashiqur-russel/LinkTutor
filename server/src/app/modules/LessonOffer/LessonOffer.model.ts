import { Schema, model, Document } from 'mongoose';

export interface ILessonOfferModel extends Document {
  name: string;
  // add more fields here
}

const LessonOfferSchema = new Schema<ILessonOfferModel>({
  name: { type: String, required: true },
  // add more fields here
});

const LessonOfferModel = model<ILessonOfferModel>('LessonOffer', LessonOfferSchema);

export default LessonOfferModel;
