import { Response } from 'express';

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  statusCode: number;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  message: string;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiErrorResponse;

/**
 * Preferred function name: sendSuccess (note spelling)
 * Keep `sendSucess` as an alias to remain backwards compatible.
 */
export function sendSuccess<T = any>(
  data: T,
  message: string,
  statusCode = 200,
): ApiSuccess<T> {
  return {
    success: true,
    data,
    message,
    statusCode,
  };
}

export function sendError(
  error: Response,
  message: string,
  statusCode = 500,
): ApiErrorResponse {
  return {
    success: false,
    error: error instanceof Error ? error.message : String(error),
    message,
    statusCode,
  };
}

export const sendErr = sendError;
