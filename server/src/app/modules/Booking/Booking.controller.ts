import { Request, Response } from 'express';
import { bookingService } from './booking.service';

export const bookingController = {
  async getAll(req: Request, res: Response) {
    const data = await bookingService.getAll();
    res.json(data);
  },
};
