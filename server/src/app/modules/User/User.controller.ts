import { Request, Response } from 'express';
import { UserService } from './User.service';

export const UserController = {
  async getAll(req: Request, res: Response) {
    const data = await UserService.getAll();
    res.json(data);
  },
};
