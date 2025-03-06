import { Schema, model, Document } from 'mongoose';

export interface IReviewModel extends Document {
  name: string;
  // add more fields here
}

const ReviewSchema = new Schema<IReviewModel>({
  name: { type: String, required: true },
  // add more fields here
});

const ReviewModel = model<IReviewModel>('Review', ReviewSchema);

export default ReviewModel;
