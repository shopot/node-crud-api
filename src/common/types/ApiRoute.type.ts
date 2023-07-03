import { IncomingMessage, ServerResponse } from 'http';

export type ApiRoute = {
  [key: string]: (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage> & {
      req: IncomingMessage;
    }
  ) => Promise<void>;
};
