import { IncomingMessage } from 'http';

import { HTTP404Error } from './errors/Http404Error';
import { ErrorMessage } from './errors/ErrorMessage';

export class BaseController {
  public async getBody(request: IncomingMessage): Promise<object> {
    return new Promise((resolve, reject) => {
      let body = '';

      request.on('data', (chunk: Uint8Array) => {
        body += chunk;
      });

      request
        .on('end', () => {
          const data = body.toString().trim();

          try {
            resolve(data ? JSON.parse(data) : {});
          } catch {
            throw new HTTP404Error(ErrorMessage.INVALID_REQUEST_PAYLOAD);
          }
        })
        .on('error', () => {
          reject();
        });
    });
  }
}
