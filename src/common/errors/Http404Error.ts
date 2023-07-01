import { BaseError } from './BaseError';
import { HttpStatusCode } from '../HttpStatusCode';

export class HTTP404Error extends BaseError {
  constructor(description = 'Not found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description, true);
  }
}
