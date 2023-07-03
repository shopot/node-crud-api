import { IncomingMessage, request, ServerResponse } from 'http';

import { API_HOSTNAME } from '../config';
import { HttpStatusCode } from '../common/HttpStatusCode';

export const createRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  port: number
) =>
  request(
    {
      host: API_HOSTNAME,
      path: req.url,
      method: req.method,
      headers: req.headers,
      port,
    },
    (response) => {
      res.statusCode = response.statusCode || HttpStatusCode.NOT_FOUND;

      res.setHeader('content-type', 'application/json');

      response.pipe(res);
    }
  );
