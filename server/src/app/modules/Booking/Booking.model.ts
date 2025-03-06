import { Schema, model, Document } from 'mongoose';

export interface IBookingModel extends Document {
  name: string;
  // add more fields here
}

const BookingSchema = new Schema<IBookingModel>({
  name: { type: String, required: true },
  // add more fields here
});

const BookingModel = model<IBookingModel>('Booking', BookingSchema);

export default BookingModel;
