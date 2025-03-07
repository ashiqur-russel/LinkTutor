import { Request, Response } from 'express';
import { lessonRequestService } from './lessonRequest.service';

export const lessonRequestController = {
  async getAll(req: Request, res: Response) {
    const data = await lessonRequestService.getAll();
    res.json(data);
  },
};
