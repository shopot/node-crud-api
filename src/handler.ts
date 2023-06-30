import { createEndpointKey } from './util/createEndpointKey';
import { IncomingMessage, ServerResponse } from 'http';
import { APP_ENDPOINTS } from './config';
import { routes } from './routes/routes';
import { errorHandler } from './common/ErrorHandler';
import { BaseError } from './common/errors/BaseError';
import { DEFAULT_HEADER } from './common/constants';
import { HttpStatusCode } from './common/HttpStatusCode';

const handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { url, method } = request;

  const key = createEndpointKey(APP_ENDPOINTS, url, method);

  const handlerListener = Object.hasOwn(routes, key)
    ? routes[key as keyof typeof routes]
    : routes.default;

  return Promise.resolve(handlerListener(request, response)).catch(handlerError(response));
};

const handlerError = (
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  return (error: Error) => {
    errorHandler.handleError(error);

    if (errorHandler.isTrustedError(error)) {
      response.writeHead((error as BaseError).httpCode, DEFAULT_HEADER);

      response.write(
        JSON.stringify({
          error: error.message,
        })
      );
    } else {
      response.writeHead(HttpStatusCode.INTERNAL_SERVER, DEFAULT_HEADER);

      response.write(
        JSON.stringify({
          error: 'internal server error',
        })
      );
    }

    response.end();
  };
};

export default handler;
