import { BaseError } from './errors/BaseError';

class ErrorHandler {
  public handleError(err: Error): void {
    /** Use this for a logging errors implementation
    console.log(err.name); */

    if (err.name) {
      return;
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }

    return false;
  }
}

export const errorHandler = new ErrorHandler();
