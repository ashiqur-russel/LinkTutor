import { Request, Response } from 'express';
import { AdminService } from './Admin.service';

export const AdminController = {
  async getAll(req: Request, res: Response) {
    const data = await AdminService.getAll();
    res.json(data);
  },
};
