import type { Request, Response } from 'express';

export type ApiError = {
  statusCode?: number;
  code?: string;
} & Error;

export function errorHandler(
  err: ApiError,
  _: Request,
  res: Response,
): void {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      statusCode,
    },
  });
}
