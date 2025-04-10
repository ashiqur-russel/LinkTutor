import { Response } from "express";

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data?: T;
  sessionId?: any | null;
  clientSecret?: any | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
    sessionId: data.sessionId ?? undefined,
    clientSecret: data.clientSecret ?? undefined,
  });
};

export default sendResponse;
