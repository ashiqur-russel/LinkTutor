import { Request, Response } from 'express';
import { LessonOfferService } from './LessonOffer.service';

export const LessonOfferController = {
  async getAll(req: Request, res: Response) {
    const data = await LessonOfferService.getAll();
    res.json(data);
  },
};
