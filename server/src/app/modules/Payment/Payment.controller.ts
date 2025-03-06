import { Request, Response } from 'express';
import { PaymentService } from './Payment.service';

export const PaymentController = {
  async getAll(req: Request, res: Response) {
    const data = await PaymentService.getAll();
    res.json(data);
  },
};
