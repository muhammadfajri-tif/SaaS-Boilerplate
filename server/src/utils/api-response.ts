import type { Response } from 'express';

export type ApiSuccessResponse<T = any> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
};

export function apiSuccess<T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
): Response<ApiSuccessResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function apiError(
  res: Response,
  message: string,
  code: string,
  statusCode: number = 500,
): Response<ApiErrorResponse> {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      statusCode,
    },
  });
}
