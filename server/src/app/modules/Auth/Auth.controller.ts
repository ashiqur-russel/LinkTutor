import { Request, Response } from 'express';
import { AuthService } from './Auth.service';

export const AuthController = {
  async getAll(req: Request, res: Response) {
    const data = await AuthService.getAll();
    res.json(data);
  },
};
