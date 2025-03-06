import { Request, Response } from 'express';
import { LessonRequestService } from './LessonRequest.service';

export const LessonRequestController = {
  async getAll(req: Request, res: Response) {
    const data = await LessonRequestService.getAll();
    res.json(data);
  },
};
