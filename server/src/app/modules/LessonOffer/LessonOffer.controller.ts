import { Request, Response } from 'express';
import { lessonOfferService } from './lessonOffer.service';

export const lessonOfferController = {
  async getAll(req: Request, res: Response) {
    const data = await lessonOfferService.getAll();
    res.json(data);
  },
};
