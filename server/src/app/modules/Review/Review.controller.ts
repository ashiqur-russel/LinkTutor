import { Request, Response } from 'express';
import { ReviewService } from './Review.service';

export const ReviewController = {
  async getAll(req: Request, res: Response) {
    const data = await ReviewService.getAll();
    res.json(data);
  },
};
