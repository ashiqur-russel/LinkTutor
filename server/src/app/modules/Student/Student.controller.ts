import { Request, Response } from 'express';
import { StudentService } from './Student.service';

export const StudentController = {
  async getAll(req: Request, res: Response) {
    const data = await StudentService.getAll();
    res.json(data);
  },
};
