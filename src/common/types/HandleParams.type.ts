import { IncomingMessage, ServerResponse } from 'http';

export type HandleParams = {
  request: IncomingMessage;
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  };
};
