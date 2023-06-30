import { BaseError } from './errors/BaseError';

class ErrorHandler {
  public handleError(err: Error): void {
    console.log(err.name);
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }

    return false;
  }
}

export const errorHandler = new ErrorHandler();
