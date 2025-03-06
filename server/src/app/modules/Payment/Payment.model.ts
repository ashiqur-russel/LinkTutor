import { Schema, model, Document } from 'mongoose';

export interface IPaymentModel extends Document {
  name: string;
  // add more fields here
}

const PaymentSchema = new Schema<IPaymentModel>({
  name: { type: String, required: true },
  // add more fields here
});

const PaymentModel = model<IPaymentModel>('Payment', PaymentSchema);

export default PaymentModel;
