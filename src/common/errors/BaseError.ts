import { HttpStatusCode } from '../HttpStatusCode';
import { ErrorMessage } from './ErrorMessage';

export class BaseError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;

    this.httpCode = httpCode;

    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  public static isTrustedError(error: unknown): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }

    return false;
  }

  public static isString(error: unknown) {
    return typeof error;
  }

  public static createResponse(message: string) {
    switch (message) {
      case ErrorMessage.USER_NOT_FOUND: {
        return {
          httpCode: HttpStatusCode.NOT_FOUND,
          message,
        };
      }

      default: {
        return {
          httpCode: HttpStatusCode.UNKNOWN_ERROR,
          message: ErrorMessage.UNKNOWN_ERROR,
        };
      }
    }
  }
}
