import { BaseError } from './BaseError';
import { HttpStatusCode } from '../HttpStatusCode';

export class Http500Error extends BaseError {
  constructor(description = 'internal server error') {
    super('INTERNAL SERVER ERROR', HttpStatusCode.INTERNAL_SERVER, description, true);
  }
}
