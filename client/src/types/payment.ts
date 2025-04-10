export interface IPaymentHistory {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
  student?: {
    name: string;
    classLevel: string;
  };
  tutor?: {
    name: string;
  };
  booking: {
    sessionDate: string;
    subject?: string;
  };
}
