import { IncomingMessage, ServerResponse } from 'http';

export type HandleParams = {
  request?: IncomingMessage;
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  };
};

export type TypeRoute = {
  [key: string]: (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage> & {
      req: IncomingMessage;
    }
  ) => Promise<void>;
};
