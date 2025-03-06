import { Request, Response } from 'express';
import { BookingService } from './Booking.service';

export const BookingController = {
  async getAll(req: Request, res: Response) {
    const data = await BookingService.getAll();
    res.json(data);
  },
};
