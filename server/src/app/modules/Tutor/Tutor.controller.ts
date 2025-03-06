import { Request, Response } from 'express';
import { TutorService } from './Tutor.service';

export const TutorController = {
  async getAll(req: Request, res: Response) {
    const data = await TutorService.getAll();
    res.json(data);
  },
};
