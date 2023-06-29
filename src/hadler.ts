import { createEndpointKey, DEFAULT_HEADER } from './util';
import { IncomingMessage, ServerResponse } from 'http';
import { APP_ENDPOINTS } from './config';
import { routes } from './routes';

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
    console.log('Something bad has happened**', error.stack);

    response.writeHead(500, DEFAULT_HEADER);

    response.write(
      JSON.stringify({
        error: 'Internal server error',
      })
    );

    response.end();
  };
};

export default handler;
